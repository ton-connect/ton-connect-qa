Feature: Connect

  Scenario: Connect your wallet
    Given I am open app "https://townsquarexyz.github.io/demo-dapp-with-vue-ui/"
    Then I see in title "Demo Dapp Vue UI"
    When I click on connect button
    Then I see widget with title "Connect your wallet"
