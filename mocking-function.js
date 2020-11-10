const { expect } = require("jest");

console.log("sanity check");

const myMockFn = jest.fn((n) => n >= 21);

test("filter calls function correctly", () => {
    const ages = [22, 14, 34];
    ages.filter(myMockFn);
    console.log("myMockFn.mock: ", myMockFn.mock);
    // if (ages >= 21) {
    //     return true;
    // }
    // check that filter called our function 3 times (or for
    //every element in the array)

    expect(myMockFn.mock.calls.length).toBe(3);

    // check that the first element "passes" our filter check
    expect(myMockFn.mock.results[0].value).toBe(true);

    // check
    expect(myMockFn.mock.results[1].value).toBe(false);
});
// [1,2,3].filter() get familiar with this
