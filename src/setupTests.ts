// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder as UtilTextDecoder } from 'util';

// Assign global TextEncoder
global.TextEncoder = TextEncoder;

// Assign global TextDecoder with a type assertion to bypass strict type checks
global.TextDecoder = UtilTextDecoder as unknown as typeof global.TextDecoder;
