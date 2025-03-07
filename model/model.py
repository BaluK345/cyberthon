import pandas as pd
import torch
from transformers import RobertaTokenizer, RobertaForSequenceClassification
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from torch.utils.data import Dataset, DataLoader
import torch.nn as nn

# Define a custom dataset class for our text data
class TextDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]

        encoding = self.tokenizer.encode_plus(
            text,
            max_length=self.max_len,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )

        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

# Load the dataset
df = pd.read_csv('ecommerceDataset.csv')

# Split the data into training and validation sets
train_texts, val_texts, train_labels, val_labels = train_test_split(df['text'], df['label'], random_state=42, test_size=0.2)

# Create a RoBERTa tokenizer
tokenizer = RobertaTokenizer.from_pretrained('roberta-large')

# Create a custom dataset instance
train_dataset = TextDataset(train_texts, train_labels, tokenizer, max_len=512)
val_dataset = TextDataset(val_texts, val_labels, tokenizer, max_len=512)

# Create data loaders for the training and validation sets
train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=16, shuffle=False)

# Load a pre-trained RoBERTa model and create a custom classification head
model = RobertaForSequenceClassification.from_pretrained('roberta-large', num_labels=8)

# Set the device (GPU or CPU)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

# Define the optimizer and scheduler
optimizer = torch.optim.Adam(model.parameters(), lr=1e-5, weight_decay=0.01)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=10)

# Train the model
for epoch in range(10):
    model.train()
    total_loss = 0
    for batch in train_loader:
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)

        optimizer.zero_grad()

        outputs = model(input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss

        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    scheduler.step()
    print(f'Epoch {epoch+1}, Loss: {total_loss / len(train_loader)}')

    model.eval()
    with torch.no_grad():
        total_correct = 0
        total_labels = []
        total_preds = []
        for batch in val_loader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)

            outputs = model(input_ids, attention_mask=attention_mask)
            logits = outputs.logits
            _, predicted = torch.max(logits, dim=1)
            total_correct += (predicted == labels).sum().item()
            total_labels.extend(labels.cpu().numpy())
            total_preds.extend(predicted.cpu().numpy())

        accuracy = total_correct / len(val_labels)
        precision = precision_score(total_labels, total_preds, average='macro')
        recall = recall_score(total_labels, total_preds, average='macro')
        f1 = f1_score(total_labels, total_preds, average='macro')
        print(f'Epoch {epoch+1}, Val Accuracy: {accuracy:.4f}, Val Precision: {precision:.4f}, Val Recall: {recall:.4f}, Val F1: {f1:.4f}')

        if accuracy > 0.96 and precision > 0.96 and recall > 0.96 and f1 > 0.96:
            print('Model has achieved desired performance metrics. Stopping training.')
            break

# Evaluate the model on the test set
test_texts, test_labels = df['text'], df['label']
test_dataset = TextDataset(test_texts, test_labels, tokenizer, max_len=512)
test_loader = DataLoader(test_dataset, batch_size=16, shuffle=False)

model.eval()
with torch.no_grad():
    total_correct = 0
    total_labels = []
    total_preds = []
    for batch in test_loader:
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)

        outputs = model(input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        _, predicted = torch.max(logits, dim=1)
        total_correct += (predicted == labels).sum().item()
        total_labels.extend(labels.cpu().numpy())
        total_preds.extend(predicted.cpu().numpy())

    accuracy = total_correct / len(test_labels)
    precision = precision_score(total_labels, total_preds, average='macro')
    recall = recall_score(total_labels, total_preds, average='macro')
    f1 = f1_score(total_labels, total_preds, average='macro')
    print(f'Test Accuracy: {accuracy:.4f}, Test Precision: {precision:.4f}, Test Recall: {recall:.4f}, Test F1: {f1:.4f}')