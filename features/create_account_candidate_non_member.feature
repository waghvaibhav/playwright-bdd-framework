@non-member
Feature: Create a candidate account for Non Ordinary Member
  As a candidate
  I want to create an account
  So that I can apply for Exams

  Scenario Outline: Valid - create candidate account with different data
    Given I am on the candidate create account page
    When I select "<title>" and enter candidate fullname "<fullname>"
    When I select DOB "<dd>" "<mm>" "<yy>" via calender
    Then the DOB field should contain "<expectedDOB>"
    When I enter candidate email "<email>"
    And I click on "verify email" button
    When I enter OTP "<otp>" in email OTP field
    Then I click on verify OTP button
    Then I should see an OTP error dialog with message "Invalid OTP"
    Examples:
      | title | fullname     | dd | mm        | yy   | expectedDOB | email            | otp    |
      | Mr.   | Vaibhav Wagh | 13 | september | 1956 | 13-09-1956  | gmail.com        | 123456 |
      | Ms.   | Jane Doe     | 25 | december  | 1990 | 25-12-1990  | example.test     | 123456 |
      | Dr.   | John Smith   | 1  | january   | 1985 | 01-01-1985  | any@ignored.here | 123456 |
      | Mrs.  | Alice Brown  | 7  | july      | 1978 | 07-07-1978  | testdomain.org   | 123456 |
      | Prof. | Bob White    | 30 | april     | 2000 | 30-04-2000  | mycustomdomain   | 123456 |

  Scenario: Valid - create account of candidate with valid data
    Given I am on the candidate create account page
    When I select "Mr." and enter candidate fullname "Vaibhav Wagh"
    When I select DOB "13" "september" "1995" via calender
    Then the DOB field should contain "13-09-1995"
    When I enter candidate email "example.test"
    And I click on "verify email" button
    And I enter OTP "123456" in email OTP field
    Then I click on verify OTP button
    Then I should see the message "Email verified successfully."

  Scenario: Create account with invalid email format
    Given I am on the candidate create account page
    When I select "Mr." and enter candidate fullname "Vaibhav Wagh"
    When I select DOB "13" "september" "1995" via calender
    Then the DOB field should contain "13-09-1995"
    When I enter candidate invalid email "Test@.com"
    Then I should see an email error dialog with message "Invalid input."

  Scenario: Invalid - create account of candidate with invalid OTP
    # Use a fresh identity so we never hit rate limit
    Given I am on the candidate create account page
    When I select "Mr." and enter candidate fullname "Vaibhav Wagh"
    When I select DOB "13" "september" "1995" via calender
    Then the DOB field should contain "13-09-1995"
    When I enter candidate email "example.test"
    And I click on "verify email" button
    And I enter OTP "123457" in email OTP field
    And I click on verify OTP button
    Then I should see an OTP error dialog with message "Invalid OTP"

  Scenario: Invalid - create account of candidate with invalid OTP and multiple attempts
    Given I am on the candidate create account page
    When I select "Mr." and enter candidate fullname "Vaibhav Wagh"
    When I select DOB "13" "september" "1995" via calender
    Then the DOB field should contain "13-09-1995"
    When I enter candidate email "example.test"
    And I click on "verify email" button
    And I enter OTP "123457" in email OTP field
    And I click on verify OTP button
    And I enter OTP "654321" in email OTP field
    And I click on verify OTP button
    And I enter OTP "111111" in email OTP field
    And I click on verify OTP button
    And I click on "verify email" button
    Then I should see an OTP error dialog with message "Too many incorrect OTP attempts. Try again after 10 minutes."

