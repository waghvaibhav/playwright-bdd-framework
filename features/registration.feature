@regression @registration
Feature: User Registration

  Scenario Outline: Register new user
    Given I am on the registration page
    When I register with name "<name>", email "<email>", password "<password>", confirm password "<confirmPassword>"
    Then I should see the message "<expectedMessage>"

    Examples:
      | name            | email                  | password     | confirmPassword | expectedMessage              |
      | John Doe        | john@example.com       | Password123  | Password123     | Registration successful!     |
      | Jane Doe        | jane@example.com       | Pass123      | Pass123         | Registration successful!     |
      | Mismatch User   | mismatch@example.com   | Password123  | WrongPass       | Passwords do not match       | 
      | John Doe        | john@example.com       | Password123  | Password123     | Registration successful!     |
      | Jane Doe        | jane@example.com       | Pass123      | Pass123         | Registration successful!     |
      | Mismatch User   | mismatch@example.com   | Password123  | WrongPass       | Passwords do not match       |





