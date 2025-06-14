import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CaseDetailsType} from '../stacks/YourCasesStack';

const initialState = {
  caseList: [] as CaseDetailsType[],
};

const authSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    // Login reducer: sets user and saves auth info to AsyncStorage.
    setCases: (state, action: PayloadAction<CaseDetailsType>) => {
      state.caseList = action.payload;
      console.log(action.payload);
    },
  },
});

export const {setCases} = authSlice.actions;
export default authSlice.reducer;
