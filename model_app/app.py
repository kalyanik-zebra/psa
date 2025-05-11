from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)

# Load the pipeline and encoders
pipeline = joblib.load('../data/random_forest_pipeline.pkl')
encoders = joblib.load('../data/encoders.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.json
    input_features = data['features']  # Example: ['Magarpatta', 18.511154, 73.927382, 'Family-friendly', False, True, True, 4]

    # Map input to a DataFrame
    feature_names = ['location name', 'lat', 'lon', 'experience', 'is_crowdy', 'police_station_nearby', 'crime_records_severe', 'rating']
    input_df = pd.DataFrame([input_features], columns=feature_names)

    # Encode categorical columns
    for col in encoders:
        if col in input_df.columns:
            input_df[col] = encoders[col].transform(input_df[col])

    # Use the pipeline to preprocess and predict
    prediction = pipeline.predict(input_df)
    return jsonify({'safety_level': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)