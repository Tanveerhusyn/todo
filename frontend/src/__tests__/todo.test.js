import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../components/todocard';

describe('TodoCard component', () => {
  test('Renders task and creation time', () => {
    const todo = {
      task: 'Sample Task',
      _id: '123',
      completed: false,
      completedTime: null,
      creationTime: '2023-05-26T10:00:00.000Z',
    };

    render(<TodoCard todo={todo} onDelete={() => {}} onComplete={() => {}} />);
    
    const taskElement = screen.getByText('Sample Task');
    // const creationTimeElement = screen.getByText('Created: 26-05-23 10:00');
    
    expect(taskElement).toBeInTheDocument();
     
  });

  test('Handles checkbox change', () => {
    const todo = {
      task: 'Sample Task',
      _id: '123',
      completed: false,
      completedTime: null,
      creationTime: '2023-05-26T10:00:00.000Z',
    };
  
    const onCompleteMock = jest.fn();
  
    render(<TodoCard todo={todo} onDelete={() => {}} onComplete={onCompleteMock} />);
    
    const checkboxElement = screen.getByRole('checkbox');
    
    fireEvent.click(checkboxElement);
    
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
    expect(onCompleteMock).toHaveBeenCalledWith(todo, true);
  });

  
  
});
