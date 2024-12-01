import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Slider } from '@rneui/base';

const SliderComponent: React.FC<SliderComponentProps> = ({ value, onValueChange, maximumValue, minimumValue}) => {
  return (
    <Slider
      value={value}
      onValueChange={onValueChange}
      maximumValue={maximumValue}
      minimumValue={minimumValue}
      step={1}
      allowTouchTrack
      style={styles.slider}
      trackStyle={{ height: 3, backgroundColor: 'transparent' }}
      thumbStyle={{ height: 15, width: 15, backgroundColor: 'transparent' }}
      thumbProps={{
        children: (
          <Icon
            name="crosshairs"
            type="font-awesome"
            size={15}
            reverse
            containerStyle={{ bottom: 15, right: 15 }}
            color={'#2b64cf'}
          />
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  slider: {
    width: 200,
    alignSelf: 'center',
  },
});

export default SliderComponent;
