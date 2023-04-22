import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);

  const userInputEl = screen.getByPlaceholderText(/username/i);

  expect(userInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);

  const passInputEl = screen.getByPlaceholderText(/password/i);

  expect(passInputEl).toBeInTheDocument();
});

test("login button should be rendered", () => {
  render(<Login />);

  const loginBtn = screen.getByRole("button");

  expect(loginBtn).toBeInTheDocument();
});

test("username input should be empty on render", () => {
  render(<Login />);

  const userInputEl = screen.getByPlaceholderText(/username/i);

  expect(userInputEl.value).toBe("");
});

test("password input should be empty on render", () => {
  render(<Login />);

  const passInputEl = screen.getByPlaceholderText(/password/i);

  expect(passInputEl.value).toBe("");
});

test("login button should be disabled on render", () => {
  render(<Login />);

  const loginBtn = screen.getByRole("button");

  expect(loginBtn).toBeDisabled();
});

test("error span should be invisible on render", () => {
  render(<Login />);

  const errorSpan = screen.getByText(/something went wrong/i);

  expect(errorSpan).not.toBeVisible();
});

test("username input should be change", () => {
  render(<Login />);

  const userInputEl = screen.getByPlaceholderText(/username/i);

  fireEvent.change(userInputEl, { target: { value: "Test" } });

  expect(userInputEl.value).toBe("Test");
});

test("password input should be change", () => {
  render(<Login />);

  const passInputEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(passInputEl, { target: { value: "Test" } });

  expect(passInputEl.value).toBe("Test");
});

test("login button should be enabled when inputs have changed", () => {
  render(<Login />);

  const loginBtn = screen.getByRole("button");
  const passInputEl = screen.getByPlaceholderText(/password/i);
  const userInputEl = screen.getByPlaceholderText(/username/i);

  fireEvent.change(userInputEl, { target: { value: "Test" } });
  fireEvent.change(passInputEl, { target: { value: "Test" } });

  expect(loginBtn).not.toBeDisabled();
});

test("loading text should not show on render", () => {
  render(<Login />);

  const loginText = screen.getByText(/login/i);

  expect(loginText).toBeInTheDocument();
});

test("on submit, loading text should show", async () => {
  render(<Login />);

  const loginBtn = screen.getByRole("button");
  const loginText = screen.getByText(/login/i);
  const passInputEl = screen.getByPlaceholderText(/password/i);
  const userInputEl = screen.getByPlaceholderText(/username/i);

  fireEvent.change(userInputEl, { target: { value: "Test" } });
  fireEvent.change(passInputEl, { target: { value: "Test" } });
  fireEvent.click(loginBtn);

  await waitFor(() => expect(loginText).toHaveTextContent(/loading.../i));
});

test("on submit, user name from api is visible", async () => {
  render(<Login />);

  const loginBtn = screen.getByRole("button");
  const passInputEl = screen.getByPlaceholderText(/password/i);
  const userInputEl = screen.getByPlaceholderText(/username/i);

  fireEvent.change(userInputEl, { target: { value: "Test" } });
  fireEvent.change(passInputEl, { target: { value: "Test" } });
  fireEvent.click(loginBtn);

  const userFromApi = await screen.findByText("John");

  expect(userFromApi).toBeInTheDocument();
});
