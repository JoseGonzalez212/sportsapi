import sys, json

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

lines = read_in()

#print(lines)


import numpy as np
import pandas as pd

# Import the dataset
dataset = pd.read_csv(r"C:\Users\Jose\Desktop\SeniorProject\sportsapi\python\processedData19-20.csv")
x = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, -1].values

# Split the data set into Training and Testing
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)

# Fit the model to the traning set
from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(n_estimators=10, criterion='entropy', random_state=0)
classifier.fit(x, y)
print(x_test)

# Predicting the results
y_pred = classifier.predict(x_test)

# Evaluating the performance, take a look at the number of correct predictions
# making the confusion matrix (will contain the correct from test set 
# and incorrect predictions)
# from sklearn.metrics import confusion_matrix, accuracy_score


myPrediction = classifier.predict([lines])
print(myPrediction)
