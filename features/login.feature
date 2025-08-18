@smoke @regression
Feature: Login Functionality

 Scenario: Valid Login
   Given I am on the login page
   When I enter username "student" and password "Password123"
   Then I should be redirected to the dashboard "https://practicetestautomation.com/logged-in-successfully/" url
  And I should see a welcome message "Logged In Successfully"

  Scenario Outline: Unsuccessful login with incorrect password
    Given I am on the login page
    When I enter username "<username>" and password "<password>"
    Then I should see an error message "Your password is invalid!"
    Examples:
      | username | password       |
      | student | WrongPassword1 |
      | student | WrongPassword2 |
      | student | WrongPassword3 |


  Scenario Outline: Unsuccessful login with incorrect username
    Given I am on the login page
    When I enter username "<username>" and password "<password>"
    Then I should see an error message "Your username is invalid!"
    Examples:
      | username | password       |
      | student1 | WrongPassword1 |
      | student2 | WrongPassword2 |
      | student3 | WrongPassword3 |

  Scenario: Unsuccessful login with empty credentials
    Given I am on the login page
    When I enter username "" and password ""
    Then I should see an error message "Your username is invalid!"

  Scenario: Unsuccessful login with empty password
    Given I am on the login page
    When I enter username "student" and password ""
    Then I should see an error message "Your password is invalid!"

  Scenario: Unsuccessful login with empty username
    Given I am on the login page
    When I enter username "" and password "Password123"
    Then I should see an error message "Your username is invalid!"

  Scenario: Unsuccessful login with invalid username
    Given I am on the login page
    When I enter username "invalidUser" and password "Password123"
    Then I should see an error message "Your username is invalid!"

    Scenario: Unsuccessful login with invalid password
    Given I am on the login page
    When I enter username "student" and password "<password>"
    Then I should see an error message "Your password is invalid!"      


# @smoke @regression
# Feature: Login Functionality

#   Scenario: Successful login
#     Given I am on the login page
#     When I enter username "student" and password "Password123"
   # Then I should be redirected to the dashboard

