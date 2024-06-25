import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "07/20/2023";

  fireEvent.change(inputTask, { target: { value: "duplicate"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "duplicate"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getAllByText(/duplicate/i);
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "07/20/2023";
  
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  
  const message = screen.getByText("You have no todo's left");
  expect(message).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  
  fireEvent.change(inputTask, { target: { value: "blank"}});
  fireEvent.click(element);
  
  const message = screen.getByText("You have no todo's left");
  expect(message).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "07/20/2023";

  fireEvent.change(inputTask, { target: { value: "delete"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  
  const deleteButton = screen.getByTestId("new-item-delete");
  fireEvent.click(deleteButton);
  const message = screen.getByText("You have no todo's left");
  expect(message).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "07/20/2023";

  fireEvent.change(inputTask, { target: { value: "due"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByTestId(/due/i).style.backgroundColor;
  expect(check).toBe('red');
 });
