export const NoFlags =   0b00000000000000000000000000;
export const Placement = 0b00000000000000000000000010; // insert
export const Update =    0b00000000000000000000000100; // update
export const MutationMask = Placement | Update; // mutate(insert or update)
