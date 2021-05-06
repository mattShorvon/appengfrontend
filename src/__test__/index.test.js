import React from "react"
import MasterForm from "../index";
import {fireEvent, render} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from '@testing-library/user-event'

test("Check to see if the first page of the form renders", () => {
    const component = render(<MasterForm />);
    const welcomePageHeader = component.getByTestId("welcomePageHeader");

    expect(welcomePageHeader.textContent).toBe("Welcome!")
})

test("Check to see if pressing the next button on the form welcome page takes the user to the first step of the form", () => {
    const component = render(<MasterForm />);
    const firstNextBtn = component.getByTestId("firstNextBtn")

    fireEvent.click(firstNextBtn)

    const firstStepHeader = component.getByTestId("firstStepHeader");
    expect(firstStepHeader.textContent).toContain("First, we need a few details from you")
})

test("check to see if trying to continue the first step without filling the first name results in error",() => {
    const component = render(<MasterForm />);
    const firstNextBtn = component.getByTestId("firstNextBtn")

    fireEvent.click(firstNextBtn)

    const firstStepHeader = component.getByTestId("firstStepHeader");
    expect(firstStepHeader.textContent).toContain("First, we need a few details from you")
    const mainNextBtn = component.getByTestId("mainNextBtn")

    fireEvent.click(mainNextBtn)

    //if this is still here, then we're still at the first step:

    expect(firstStepHeader.textContent).toContain("First, we need a few details from you")


})

test("check to see if filling in all steps would result in a successful submission", async () => {
    const component = render(<MasterForm />);
    const firstNextBtn = component.getByTestId("firstNextBtn")

    //click next button:
    fireEvent.click(firstNextBtn)

    let firstStepHeader = component.getByTestId("firstStepHeader");

    //Welcome screen successful:
    expect(firstStepHeader.textContent).toContain("First, we need a few details from you")

    const mainNextBtn = component.getByTestId("mainNextBtn")
    const firstName = component.getByTestId("firstName")
    const lastName = component.getByTestId("lastName")
    const email = component.getByTestId("email")
    const address = component.getByTestId("address")
    const postcode = component.getByTestId("postcode")
    const phoneNumber = component.getByTestId("phoneNumber")

    const randomString = "blablabla"

    fireEvent.change(firstName, {
        target: {
            value: randomString
        }
    })

    fireEvent.change(lastName, {
        target: {
            value: randomString
        }
    })

    fireEvent.change(email, {
        target: {
            value: randomString
        }
    })

    fireEvent.change(address, {
        target: {
            value: randomString
        }
    })

    fireEvent.change(postcode, {
        target: {
            value: randomString
        }
    })

    fireEvent.change(phoneNumber, {
        target: {
            value: randomString
        }
    })

    //clicking next button:
    fireEvent.click(mainNextBtn)


    await new Promise(resolve => setTimeout(resolve, 1000))

    let secondStepHeader = component.getByTestId("secondStepHeader")

    //first step successful:
    expect(secondStepHeader.textContent).toBe("What would you like your PASSWORD to be?")


    const password = component.getByTestId("password")
    const passwordVerify = component.getByTestId("passwordVerify")

    fireEvent.change(password, {
        target: {
            value: "pass123"
        }
    })

    fireEvent.change(passwordVerify, {
        target: {
            value: "pass123"
        }
    })

    //clicking next button:
    fireEvent.click(mainNextBtn)

    const thirdStepHeader = component.getByTestId("thirdStepHeader")

    //second step successful:
    expect(thirdStepHeader.textContent).toBe("What is the name of your business?")

    const businessName = component.getByTestId("businessName")

    fireEvent.change(businessName, {
        target: {
            value: "something"
        }
    })

    //clicking next button:
    fireEvent.click(mainNextBtn)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const fourthStepHeader = component.getByTestId("fourthStepHeader")

    //third step successful:
    expect(fourthStepHeader.textContent).toBe("Add a short description about yourself!")

    const aboutMe = component.getByTestId("aboutMe")

    fireEvent.change(aboutMe, {
        target: {
            value: "I am the coolest baker in town"
        }
    })

    fireEvent.click(mainNextBtn)

    const fifthStepHeader = component.getByTestId("fifthStepHeader")

    //fourth step successful:
    expect(fifthStepHeader.textContent).toContain("Next we will ask you about the kinds of goods")

    let nextBtnItems = component.getByTestId("nextBtnItems")

    fireEvent.click(nextBtnItems)

    let goodNrHeader = component.getByTestId("goodNrHeader")

    //successfully confirmed the number of goods we want to set up (1):
    expect(goodNrHeader.textContent).toBe("How many goods would you like to set up right now?")

    let confirmItemNrBtn = component.getByTestId("confirmItemNrBtn")

    fireEvent.click(confirmItemNrBtn)

    const goodName = component.getByTestId("goodName")
    const goodDescription = component.getByTestId("goodDescription")
    const goodPrice = component.getByTestId("goodPrice")
    const goodQuantity = component.getByTestId("goodQuantity")
    const nextGoodStepBtn = component.getByTestId("nextGoodStepBtn")
    const goodImage = component.getByTestId("goodImage")
    const fileTest = new File(['hello'], 'hello.png', {type: 'image/png',})


    fireEvent.change(goodName, {
        target: {
            value: "Test Good"
        }
    })

    fireEvent.change(goodDescription, {
        target: {
            value: "Test good description"
        }
    })

    fireEvent.change(goodPrice, {
        target: {
            value: 10
        }
    })

    fireEvent.change(goodQuantity, {
        target: {
            value: 2
        }
    })

    userEvent.upload(goodImage, fileTest)

    console.log(goodImage)


    // fireEvent.click(nextGoodStepBtn)
    //
    // const serviceConfHeading = component.getByTestId("serviceConfHeading")
    //
    // //successfully completed adding one good:
    // expect(serviceConfHeading.textContent).toBe("How many services would you like to set up right now?")
























})