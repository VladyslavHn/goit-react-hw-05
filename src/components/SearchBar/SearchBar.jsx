import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import css from './SearchBar.module.css';

const INITIAL_VALUES = {
  search: "",
}

const SearchBar = ({searchQuery}) => {

  const handleSubmit = (values, action) => { 
    if (!values.search.trim()) { 
      toast.error("Search field cannot be empty");
      return;
    }
    searchQuery(values.search)
    action.resetForm();
  };

  return (
    <header className={css.header}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.btnSearch} type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
}

export default SearchBar;
