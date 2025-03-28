import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getForm } from '../../../api/formService';
import { getProcessDefinition } from '../../../api/processDefinitionService';
import FormAndJsonView from '../../../components/FormAndJsonView/FormAndView';


const Home = () => {
    const dispatch = useDispatch();
    const { data: formData, loading: formLoading, error: formError } = useSelector((state) => state.form);
    const { data: processData, loading: processLoading, error: processError } = useSelector((state) => state.process);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(getForm('default')).unwrap();
          await dispatch(getProcessDefinition('default')).unwrap();
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetchData();
    }, [dispatch]);
  
    if (formLoading || processLoading) return <div className="text-center">Loading...</div>;
    if (formError) return <div className="alert alert-danger">{formError.message}</div>;
    if (processError) return <div className="alert alert-danger">{processError.message}</div>;
  
    return (
      <FormAndJsonView 
        formSchema={formData}
        jsonData={processData}
      />
    );
  };
  
  export default Home;