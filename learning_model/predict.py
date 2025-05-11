import joblib
import numpy as np

# Load the saved model and scaler
model = joblib.load('model_to_export.pkl')
scaler = joblib.load('scaler.pkl')

def predict_safety_level(location_name_encoded, lat, lon, experience_encoded):
    # Prepare the input data
    input_data = np.array([[location_name_encoded, lat, lon, experience_encoded]])
    input_data_scaled = scaler.transform(input_data)
    
    # Make prediction
    prediction = model.predict(input_data_scaled)
    return prediction[0]

# Example usage
if __name__ == "__main__":
    # Replace with actual encoded values
    location_name_encoded = 33
    lat = 18.491631
    lon = 73.897270
    experience_encoded = 13
    
    safety_level = predict_safety_level(location_name_encoded, lat, lon, experience_encoded)
    print(f"Predicted Safety Level: {safety_level}")
