import React, { useState } from 'react';
import {
  Card,
  Header,
  Segment,
  Icon,
  Accordion,
  Label
} from 'semantic-ui-react';

const RejectedRequest = ({ request }) => {
  const [activeAccordions, setActiveAccordions] = useState([]);

  const handleAccordionClick = (index) => {
    const newActiveAccordions = [...activeAccordions];
    const currentIndex = activeAccordions.indexOf(index);

    if (currentIndex > -1) {
      newActiveAccordions.splice(currentIndex, 1);
    } else {
      newActiveAccordions.push(index);
    }

    setActiveAccordions(newActiveAccordions);
  };

  const renderField = (key, value, index) => {
    if (Array.isArray(value)) {
      return (
        <Accordion key={`${key}-${index}`} styled>
          <Accordion.Title
            active={activeAccordions.includes(index)}
            index={index}
            onClick={() => handleAccordionClick(index)}
          >
            <Icon name="dropdown" />
            {key}
          </Accordion.Title>
          <Accordion.Content active={activeAccordions.includes(index)} style={{backgroundColor: 'white'}}>
            {value.map((item, itemIndex) =>
              typeof item === 'object' ? (
                renderField(`${key} - ${itemIndex + 1}`, item, itemIndex)
              ) : (
                <p key={itemIndex}>{item}</p>
              )
            )}
          </Accordion.Content>
        </Accordion>
      );
    }
    
    if (typeof value === 'object' && value !== null) {
      return (
        <Accordion key={`${key}-${index}`} styled>
          <Accordion.Title
            active={activeAccordions.includes(index)}
            index={index}
            onClick={() => handleAccordionClick(index)}
          >
            <Icon name="dropdown" />
            {key}
          </Accordion.Title>
          <Accordion.Content active={activeAccordions.includes(index)} style={{backgroundColor: 'white'}}>
            {Object.entries(value).map(([nestedKey, nestedValue], nestedIndex) => (
              <div key={nestedKey}>
                {renderField(nestedKey, nestedValue, nestedIndex)}
              </div>
            ))}
          </Accordion.Content>
        </Accordion>
      );
    }

    return (
      <Segment key={`${key}-${index}`}>
        <strong>{key}:</strong> {value}
      </Segment>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Header as="h2" icon textAlign="center">
        <Icon name="times circle" color="red" circular />
        Rejected Form Submission
      </Header>

      <Card fluid color="red">
        <Card.Content>
          {Object.entries(request.formData).map(([key, value], index) => (
            <div key={key}>
              {renderField(key, value, index)}
              <div style={{ margin: '10px 0' }} />
            </div>
          ))}
        </Card.Content>
        {request.rejectionComment && (
          <Card.Content >
            <Label color="red" ribbon>
              Rejection Comment
            </Label>
            <Segment color="red" >{request.rejectionComment}</Segment>
          </Card.Content>
        )}
      </Card>
    </div>
  );
};

export default RejectedRequest;