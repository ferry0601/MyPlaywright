Feature: Validations
@Validations
@foo
  Scenario Outline: Placing order
    Given a login ecommerce2 with "<username>" and "<password>"
    Then verify error message is diplayed

  Examples:
      | username          | password      | 
      | waferr@gmail.com  | Iamking@000   |
      | hello@123.com     | Iamhello@12   | 