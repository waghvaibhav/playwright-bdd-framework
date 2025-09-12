@tp
Feature: Create a candidate account

  Scenario: Valid Login
    Given I am on the candidate create account page
    When I select "Mr." and enter candidate fullname "Vaibhav Wagh"
    When I select DOB "13" "september" "1956" via calender
    Then the DOB field should contain "13-09-1956"
    When I enter candidate email "ivaibhavwagh@gmail.com"
    When I click on verify email button
    When I enter OTP "111111" in email OTP field
    Then I click on verify OTP button
   # Then I should see the message "Email verified successfully"
    
    