Feature: Greeting
@Regression
  Scenario: Validasi Login
    Given a login ecommerce with "waferr@gmail.com" and "Iamking@000" and expect " Login Successfully "
    When add "iphone 13 pro" to cart
    Then verify "iphone 13 pro" is displayed in the cart
    When enter valid details and place order "Ind" and "Indonesia" and "waferr@gmail.com"
    Then verify order in orderhistory


@Validations
  Scenario Outline: Placing order
    Given a login ecommerce2 with "<username>" and "<password>"
    Then verify error message is diplayed

  Examples:
      | username          | password      | 
      | waferr@gmail.com  | Iamking@000   |
      | hello@123.com     | Iamhello@12   | 