import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth
};

const mockSubmit = jest.fn();
const navigation = () => false;

test('testing authfields for login', async () => {
    const title = "Logga in"
    const { getAllByText, getByTestId, getByA11yLabel } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);
    const titleElements = await getAllByText(title);

    expect(titleElements).toBeDefined();

    const emailField = await getByTestId("email-field");
    const passWordField = await getByTestId("password-field");

    expect(emailField).toBeDefined();
    expect(passWordField).toBeDefined();

    const a11yLabel = `${title} genom att trycka`;
    const submitButton = getByA11yLabel(a11yLabel);

    expect(submitButton).toBeDefined();


    const fakeEmail = "agro21@student.bth.se";
    fireEvent.changeText(emailField, fakeEmail);
    expect(auth?.email).toEqual(fakeEmail);

    const fakePassword = "test1234";
    fireEvent.changeText(passWordField, fakePassword);
    expect(auth?.password).toEqual(fakePassword);

    fireEvent.press(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
});