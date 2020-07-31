// import {self} from 'react-native-threads';

// // This is a separate thread that handles bluetooth pairing and communication for
// // anonymous contact tracing using the dp-3t algorithm.

// self.startTracing = () => {
//     console.log('Start contact tracing');

// Establish connection using the react native ble-manager library (currently having issues)
// Scan devices which returns a promise
// Do an O(n2) loop for ever device returned on the scan, attempt a connection
// If connection is successful, exchange random messages and store locally using sqlite library
// Terminate connection and proceed to ping other devices
// repeat.
// }