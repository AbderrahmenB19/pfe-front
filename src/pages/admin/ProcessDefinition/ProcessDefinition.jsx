import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveProcessDefinition } from '/src/api/processDefinitionService';
import JSONTextArea from '../../../components/JSONTextArea/JsonTextArea';

const ProcessDefinition = () => {
  const dispatch = useDispatch();
  const { data: processData, loading, error } = useSelector((state) => state.process);

  const handleSave = async (jsonString) => {
    try {
      const jsonData = JSON.parse(jsonString);
      await dispatch(saveProcessDefinition(jsonData)).unwrap();
    } catch (err) {
      console.error("Invalid JSON or save failed:", err);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-center">Loading...</div>}
      <JSONTextArea
        initialJson={JSON.stringify(processData || {}, null, 2)}
        onSave={handleSave}
        isSaving={loading}
      />
    </div>
  );
};

export default ProcessDefinition;