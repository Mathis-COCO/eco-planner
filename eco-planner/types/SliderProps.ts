interface SliderComponentProps {
  value: number;
  onValueChange: (value: number) => void;
  maximumValue: number;
  minimumValue: number;
}