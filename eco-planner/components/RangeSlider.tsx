import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Slider } from '@rneui/base';

interface SliderComponentProps {
  value: number;
  onValueChange: (value: number) => void;
  maximumValue: number;
  minimumValue: number;
}

const SliderComponent: React.FC<SliderComponentProps> = ({
  value,
  onValueChange,
  maximumValue,
  minimumValue,
}) => {
  return (
    <Slider
      value={value}
      onValueChange={onValueChange}
      maximumValue={maximumValue}
      minimumValue={minimumValue}
      step={1}
      allowTouchTrack
      style={styles.slider}
      trackStyle={{ height: 5, backgroundColor: 'transparent' }}
      thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
      thumbProps={{
        children: (
          <Icon
            name="crosshairs"
            type="font-awesome"
            size={20}
            reverse
            containerStyle={{ bottom: 20, right: 20 }}
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
