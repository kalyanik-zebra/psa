import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const RadialProgressBar = ({ level }) => {
  const radius = 40;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const progress = useRef(new Animated.Value(circumference)).current;
  const color = useRef(new Animated.Value(level)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: circumference - (level / 100) * circumference,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    Animated.timing(color, {
      toValue: level,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [level]);

  const strokeColor = color.interpolate({
    inputRange: [25, 50, 75, 100],
    outputRange: ['#FD151B', '#EC7505', '#FFC53A', '#21A179'],
  });

  const { width } = Dimensions.get('window');
  const size = width * 0.3;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform={`rotate(-90 50 50)`}
        />
      </Svg>
      <Text style={[styles.text, { fontSize: size * 0.2 }]}>{`${level}%`}</Text>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default RadialProgressBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    fontWeight: 'bold',
    color: 'black',
  },
});
