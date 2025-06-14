import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NODE_API_ENDPOINT} from '../utils/util';

// Define a User interface. Adjust the fields as necessary.

// export interface company {
//   GSTNumber: string;
//   address: string;
//   name: string;
//   _id: string;
//   inventory: string | null;
// }

// interface User {
//   userId: string;
//   token: string;
//   name: string;
//   email: string;
//   type: string;
//   companies: company[];
//   organizationName: string;
//   // add other fields as needed
// }

export interface Advocate {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  advocateBarCode: string;
  courtOfPractice:
    | 'District Court'
    | 'State High Court'
    | 'Superme Court of India';
  FirmOwner: string;
  __v?: number;
}

export interface FirmOwner {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  advocateBarCode: string;
  courtOfPractice:
    | 'District Court'
    | 'State High Court'
    | 'Superme Court of India';
  advocates: Advocate[];
  createdAt: string;
  updatedAt: string;
  type: string;
  token: string;
  __v?: number;
}
export interface Advocate {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  advocateBarCode: string;
  courtOfPractice:
    | 'District Court'
    | 'State High Court'
    | 'Superme Court of India';
  FirmOwner: string;
  type: string;
  token: string;
  __v?: number;
}

// Define the Auth state interface.
interface AuthState {
  user: FirmOwner | null | Advocate;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  // Optional: you can store additional properties from your API
  props?: any;
}

// Set the initial state.
const initialState: AuthState = {
  user: null,
  status: 'loading',
};

// Create an async thunk for retrieving auth information.
export const retrieveAuth = createAsyncThunk<
  {user: FirmOwner | Advocate; props?: any} | null, // Returned type when fulfilled
  void, // No argument needed when dispatching
  {rejectValue: string}
>('auth/retrieveAuth', async (_, {rejectWithValue}) => {
  try {
    console.log('thunk is calling');
    // Retrieve stored auth data from AsyncStorage.
    const storedAuth = await AsyncStorage.getItem('legalAutomation_auth_user');
    console.log(storedAuth);
    if (storedAuth) {
      const parsedUser: FirmOwner | Advocate = JSON.parse(storedAuth);
      console.log(parsedUser.type);
      if (parsedUser.type === 'manager') {
        console.log('Manager');
        // Call your backend endpoint to validate or fetch additional user properties.
        const response = await fetch(`${NODE_API_ENDPOINT}/auth/getVerify`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });
        console.log(response);
        if (!response.ok) {
          return rejectWithValue('Failed to fetch user data');
        }
        const parsedProps = await response.json();
        console.log(parsedProps);
        // Ensure the returned user matches the FirmOwner interface
        return {
          user: {
            _id: parsedProps.firmOwner._id,
            name: parsedProps.firmOwner.name,
            email: parsedProps.firmOwner.email,
            phoneNumber: parsedProps.firmOwner.phoneNumber,
            advocateBarCode: parsedProps.firmOwner.advocateBarCode,
            courtOfPractice: parsedProps.firmOwner.courtOfPractice,
            advocates: parsedProps.firmOwner.advocates,
            createdAt: parsedProps.firmOwner.createdAt,
            updatedAt: parsedProps.firmOwner.updatedAt,
            type: parsedProps.type,
            token: parsedProps.token,
            __v: parsedProps.firmOwner.__v,
          } as FirmOwner,
          props: parsedProps,
        };
      } else {
        console.log('Salesman');
        // Call your backend endpoint to validate or fetch additional user properties.
        const response = await fetch(
          `${NODE_API_ENDPOINT}/auth/getVerifyAdvocate`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          },
        );
        if (!response.ok) {
          return rejectWithValue('Failed to fetch user data');
        }
        const parsedProps = await response.json();
        console.log(parsedProps);
        // Ensure the returned user matches the Advocate interface
        return {
          user: {
            _id: parsedProps.advocateWithoutPassword._id,
            name: parsedProps.advocateWithoutPassword.name,
            phoneNumber: parsedProps.advocateWithoutPassword.phoneNumber,
            email: parsedProps.advocateWithoutPassword.email,
            advocateBarCode:
              parsedProps.advocateWithoutPassword.advocateBarCode,
            courtOfPractice:
              parsedProps.advocateWithoutPassword.courtOfPractice,
            FirmOwner: parsedProps.advocateWithoutPassword.FirmOwner,
            type: parsedProps.type,
            token: parsedProps.token,
            __v: parsedProps.advocateWithoutPassword.__v,
          } as Advocate,
          props: parsedProps,
        };
      }
    } else {
      return null;
    }
  } catch (error: any) {
    return rejectWithValue(error.message || 'Error retrieving authentication');
  }
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    // Login reducer: sets user and saves auth info to AsyncStorage.
    login: (state, action: PayloadAction<FirmOwner>) => {
      state.user = action.payload;
      console.log(action.payload);
      // Save the user data as a JSON string.
      AsyncStorage.setItem(
        'legalAutomation_auth_user',
        JSON.stringify(action.payload),
      );
    },
    loginUser: (state, action: PayloadAction<Advocate>) => {
      state.user = action.payload;
      console.log(action.payload);
      // Save the user data as a JSON string.
      AsyncStorage.setItem(
        'legalAutomation_auth_user',
        JSON.stringify(action.payload),
      );
    },
    // Logout reducer: clears user data and removes auth from AsyncStorage.
    logout: state => {
      state.user = null;
      AsyncStorage.removeItem('legalAutomation_auth_user');
      console.log('User Logged Out');
    },
  },
  extraReducers: builder => {
    builder.addCase(retrieveAuth.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(retrieveAuth.fulfilled, (state, action) => {
      if (action.payload && action.payload.user) {
        state.props = action.payload.props;
        state.user = action.payload.user;
      }
      state.status = 'succeeded';
    });
    builder.addCase(retrieveAuth.rejected, (state, action) => {
      state.status = 'failed';
      state.error =
        typeof action.payload === 'string'
          ? action.payload
          : 'Authentication retrieval failed';
    });
  },
});

export const {login, logout, loginUser} = authSlice.actions;
export default authSlice.reducer;
