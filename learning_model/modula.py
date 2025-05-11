import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import GridSearchCV

label_encoder = LabelEncoder()

data = pd.read_csv('../data/updated_dataset_cor.csv')
data.head()

# data_cleaned = data.dropna()
# print(data_cleaned.head())

if 'location name' in data.columns and 'experience' in data.columns:
    data['location_name_encoded'] = label_encoder.fit_transform(data['location name'])
    data['experience_encoded'] = label_encoder.fit_transform(data['experience'])
    print("done")
    print(data.head())
else:
    print("Error: Required columns 'location name' or 'experience' are missing in the dataset.")

X = data[['location_name_encoded', 'lat', 'lon', 'experience_encoded', 'police_station_nearby', 'is_crowdy', 'crime_records_severe']]
y = data['safety_level']

X

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression()

epochs = 5
iterations = 100

for epoch in range(epochs):
    print(f"Starting Epoch {epoch + 1}")
    for iteration in range(iterations):
        model.fit(X_train, y_train)
        accuracy = model.score(X_test, y_test)
        print(f'Epoch {epoch + 1}, Iteration {iteration + 1}, Model Accuracy: {accuracy * 100:.2f}%')

    # Perform GridSearchCV at the end of each epoch
    param_grid = {
        'C': [0.1, 1, 10, 100],
        'solver': ['liblinear', 'lbfgs']
    }

    grid_search = GridSearchCV(LogisticRegression(), param_grid, cv=5, scoring='accuracy')
    grid_search.fit(X_train, y_train)

    print(f'Best Parameters for Epoch {epoch + 1}: {grid_search.best_params_}')
    print(f'Best Cross-Validation Accuracy for Epoch {epoch + 1}: {grid_search.best_score_:.2f}')

    # Update the model with the best parameters
    best_model = grid_search.best_estimator_
    best_model.fit(X_train, y_train)

    test_accuracy = best_model.score(X_test, y_test)
    print(f'Test Accuracy with Best Parameters for Epoch {epoch + 1}: {test_accuracy * 100:.2f}%')


res = model.predict(X_test)
res





# plotting

import matplotlib.pyplot as plt
import seaborn as sns

data_visualization = data[['location_name_encoded', 'lat', 'lon', 'experience_encoded', 'safety_level']]

sns.pairplot(data_visualization, hue='safety_level', diag_kind='kde')
plt.show()

comparison_df = pd.DataFrame({'Actual': y_test.values, 'Predicted': res})
# print(comparison_df.head())

correct_predictions = (comparison_df['Actual'] == comparison_df['Predicted']).sum()
total_predictions = len(comparison_df)
print(f'Correct Predictions: {correct_predictions}/{total_predictions}')




# from sklearn.ensemble import RandomForestClassifier

# rf_model = RandomForestClassifier(random_state=42)
# rf_model.fit(X_train, y_train)

# rf_accuracy = rf_model.score(X_test, y_test)
# print(f'Random Forest Test Accuracy: {rf_accuracy * 100:.2f}%')

# import joblib
# joblib.dump(rf_model, '../data/model_to_export.pkl')

# joblib.dump(scaler, '../data/scaler.pkl')

# print('Model and scaler saved successfully!')
# # import json

# # rf_model_params = rf_model.get_params()
# # scaler_params = {
# #     'mean_': scaler.mean_.tolist(),
# #     'scale_': scaler.scale_.tolist()
# # }

# # with open('../data/rf_model.json', 'w') as model_file:
# #     json.dump(rf_model_params, model_file)

# # with open('../data/scaler.json', 'w') as scaler_file:
# #     json.dump(scaler_params, scaler_file)

# # print('Model and scaler exported as JSON successfully!')


# from sklearn.svm import SVC
# from sklearn.metrics import classification_report, accuracy_score

# # Initialize the SVM model
# svm_model = SVC(kernel='rbf', C=1, gamma='scale', random_state=42)

# # Train the SVM model
# svm_model.fit(X_train, y_train)

# # Make predictions
# svm_predictions = svm_model.predict(X_test)

# # Evaluate the model
# svm_accuracy = accuracy_score(y_test, svm_predictions)
# print(f'SVM Test Accuracy: {svm_accuracy * 100:.2f}%')

# # Print classification report
# print("Classification Report for SVM:")
# print(classification_report(y_test, svm_predictions))