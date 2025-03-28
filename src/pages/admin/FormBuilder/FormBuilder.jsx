import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormBuilderReact from '../../../components/FormBuilder/FormBuilderReact';
import { saveForm, updateForm } from '../../../api/formService';

const FormBuilder = () => {
  const dispatch = useDispatch();
  const { data: formData, loading, error } = useSelector((state) => state.form);

  const handleSave = async (formJson) => {
    try {
      if (formData?.id) {
        await dispatch(updateForm({ id: formData.id, formData: formJson })).unwrap();
      } else {
        await dispatch(saveForm(formJson)).unwrap();
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-center">Loading...</div>}
      <FormBuilderReact 
        initialForm={formData}
        onSave={handleSave}
        isSaving={loading}
      />
    </div>
  );
};

export default FormBuilder;