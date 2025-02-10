Feature: Connect

  Scenario: Try connect to wallet Tonkeeper without extension
    Given I am open app "https://townsquarexyz.github.io/demo-dapp-with-vue-ui/"
    Then I see in title "Demo Dapp Vue UI"
    When I click on connect button
    Then I see widget with title "Connect your wallet"
    When I select wallet "Tonkeeper"
    Then I see widget with title "Tonkeeper"
    Then I see widget with second title "Scan the QR code below with your phone’s or Tonkeeper’s camera"
    When I select option "Browser Extension"
    Then I see widget with second title "Seems you don't have installed Tonkeeper browser extension"
