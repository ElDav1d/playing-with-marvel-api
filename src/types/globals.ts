export type BreakpointStepName = 'MD';
export type BreakpointValue = 768;

export type MediaBreakpoints = {
  [key in BreakpointStepName]: BreakpointValue;
};
