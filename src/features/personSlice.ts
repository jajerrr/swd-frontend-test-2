import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface PersonFormState {
  id: string | null;    
  title: string;
  firstName: string;
  lastName: string;
  birthday: any;
  nationality: string;
  citizenId: string;
  gender: string;
  mobile: string;
  passportNo: string;
  expectedSalary: number | null;
}

export interface Person {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  birthday: any;
  nationality: string;
  citizenId: string;
  gender: string;
  mobile: string;
  passportNo: string;
  expectedSalary: number | null;
}

interface PersonState {
  form: PersonFormState;
  list: Person[];
  isEditing: boolean;
}

const initialForm: PersonFormState = {
  id: null,
  title: "",
  firstName: "",
  lastName: "",
  birthday: null,
  nationality: "",
  citizenId: "",
  gender: "",
  mobile: "",
  passportNo: "",
  expectedSalary: null,
};

export const initialState: PersonState = {
  form: { ...initialForm },
  list: [],
  isEditing: false,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setField(
      state,
      action: PayloadAction<{ field: keyof PersonFormState; value: any }>
    ) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    resetFormState(state) {
      state.form = { ...initialForm };
      state.isEditing = false;
    },
    addPerson(state) {
      const newPerson: Person = {
        id: nanoid(),
        title: state.form.title,
        firstName: state.form.firstName,
        lastName: state.form.lastName,
        birthday: state.form.birthday,
        nationality: state.form.nationality,
        citizenId: state.form.citizenId,
        gender: state.form.gender,
        mobile: state.form.mobile,
        passportNo: state.form.passportNo,
        expectedSalary: state.form.expectedSalary,
      };
      state.list.push(newPerson);
      state.form = { ...initialForm };
      state.isEditing = false;
    },
    startEdit(state, action: PayloadAction<string>) {
      const id = action.payload;
      const found = state.list.find((p) => p.id === id);
      if (found) {
        state.form = { ...found }; 
        state.isEditing = true;
      }
    },
    updatePerson(state) {
      const id = state.form.id;
      if (!id) return;
      const index = state.list.findIndex((p) => p.id === id);
      if (index === -1) return;

      state.list[index] = {
        id,
        title: state.form.title,
        firstName: state.form.firstName,
        lastName: state.form.lastName,
        birthday: state.form.birthday,
        nationality: state.form.nationality,
        citizenId: state.form.citizenId,
        gender: state.form.gender,
        mobile: state.form.mobile,
        passportNo: state.form.passportNo,
        expectedSalary: state.form.expectedSalary,
      };

      state.form = { ...initialForm };
      state.isEditing = false;
    },
    deletePerson(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.list = state.list.filter((p) => p.id !== id);
      if (state.form.id === id) {
        state.form = { ...initialForm };
        state.isEditing = false;
      }
    },
  },
});

export const {
  setField,
  resetFormState,
  addPerson,
  startEdit,
  updatePerson,
  deletePerson,
} = personSlice.actions;

export default personSlice.reducer;
