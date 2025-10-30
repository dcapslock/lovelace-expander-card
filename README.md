# Expander Card for HomeAssistant

[![release][release-badge]][release-url]
![downloads][downloads-badge]
![build][build-badge]
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=MelleD_lovelace-expander-card&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=MelleD_lovelace-expander-card)
[![PayPal.Me][paypal-me-badge]][paypal-me-url]
[![BuyMeCoffee][buy-me-a-coffee-shield]][buy-me-a-coffee-url]

Expander/Collapsible card for HomeAssistant  

## Introduction

First a few words to start with. A big thank you goes to @Alia5 (https://github.com/Alia5/lovelace-expander-card), who initially launched the card. I forked this card for my own HomeAssistant to make a few improvements. I give no guarantee for the functionality and no promise of lifelong maintenance, as I do the whole thing in my free time. Of course, I am happy about every contribution and PR

## Demo

![Sample gif](examples/example.gif)

---

Expand button as overlay:
![Sample lights overlay](examples/lights_overlay_button.png)

---

You can even nest expanders!  

![Sample nesting](examples/nested.png)

---

Clear Background (default theme):  

![Sample clear router](examples/clear_router.png)

## Options

All options are available for editing in Graphical config editor. Title card config is in YAML at this time.

Yaml Options:

| Name                      | Type     | Default       | Supported options      | Description                                           |
| ------------------------- | -------- | ------------- | ---------------------- | ----------------------------------------------------- |
| type                      | string   | **Required**  | `custom:expander-card` | Type of the card.                                     |
| title                     | string   | Empty         | *                      | Title (Not displayed if using Title-Card)             |
| icon                      | string   | mdi:chevron-down         | mdi icon shortcut                      | Icon in button           |
| expanded                  | boolean  | _false_       | true\|false            | Start expanded                                        |
| animation                 | boolean   | _true_       | true\|false            | Should the opening/closing of expander be animated? |
| min-width-expanded        | number   | 0             | number                 | Min screen width (px) to be expanded on start (use with start expanded above)                                     |
| max-width-expanded        | number   | 0             | number            | Max screen width (px) to be expanded on start (use with start expanded above)                                        |
| storage-id                | string   | **optional**  | *                      | Save last expander state in local browser storage     |
| expander-card-id          | string    | **optional** | *                      | An id to use with [Set state via action](#set-state-via-action)        |
| arrow-color               | string   | primary-text-color,#fff | css-color    | Color of ico expand button                     |
| icon-rotate-degree        | string   | _180deg_      | css-rotate             | Changing the degrees of the button icon when clicked  |
| header-color              | string   | primary-text-color,#fff  | css-color   | Color of expand button                     |
| button-background         | string   | _transparent_ | css-color              | Background color of expand button                     |
| expander-card-background  | string   | ha-card-background, card-background-color,#fff | css-color              | Expander Card Background |
| expander-card-background-expanded    | string   |  Empty    | css-color              | Expander Card Background when card is opened/expanded|
| expander-card-display     | string   | block         | css-display            | Layout/Display of the card                            |
| clear                     | boolean  | _false_       | true\|false            | Remove Background, border                                   |
| gap                       | string   | _0.0em_       | css-size               | gap between cards when expander closed. This option depends on your CSS layout: You might need to use `expander-card-display: grid` for this.                |
| padding                   | string   | _1em_         | css-size               | padding of all card content                           |
| expanded-gap              | string   | _0.6em_       | css-size               | gap between child cards when expander open            |
| child-padding             | string   | _0.0em_       | css-size               | padding of child cards                                |
| child-margin-top          | string   | _0.0em_       | css-size               | Margin top of child cards                             |
| clear-children            | boolean  | _false_       | true\|false            | Remove Background, border from childs                                   |
| title-card                | object   | **optional**  | LovelaceCardConfig     | Replace Title with card                               |
| title-card-clickable      | boolean  | _false_       | true\|false            | Should the complete diff clickable?                   |
| title-card-button-overlay | boolean  | _false_       | true\|false            | Overlay expand button over title-card                 |
| overlay-margin            | string   | _0.0em_       | css-size               | Margin from top right of expander button (if overlay) |
| title-card-padding        | string   | _0px_         | css-size               | padding of title-card                                 |
| show-button-users         | object[] | **optional**  | *                      | Choose the persons/users that button is visible to them. |
| start-expanded-users      | object[] | **optional**  | *                      | Choose the persons/users that card will be start expanded for them. |
| cards                     | object[] | **optional**  | LovelaceCardConfig[]   | Child cards to show when expanded                     |

### Deprecation Warning

* `storage-id` was introduced in v2.5.0 and is deprecated in favor of `storgage-id`. The older `storgage-id` will be removed in a future release.

## Examples

Here are a few examples of usage.

### Title card

Example title card that is clickable and has 2 nested cards, which is directly expanded
```
    - type: custom:expander-card
      child-margin-top: 0.6em
      padding: 0
      clear: true
      title-card-button-overlay: true
      title-card-clickable: true
      expanded: true
      title-card:
        type: "custom:digital-clock"
        dateFormat:
          weekday: "long"
          day: "2-digit"
          month: "short"
        timeFormat:
          hour: "2-digit"
          minute: "2-digit"
      cards:
        - type: custom:simple-weather-card
          entity: weather.openweathermap
          primary_info:
            - wind_speed
            - wind_bearing
          secondary_info:
            - precipitation
            - precipitation_probability
        - type: custom:hourly-weather
          entity: weather.openweathermap
          icons: true
          show_precipitation_probability: true
          show_precipitation_amounts: true
          forecast_type: "hourly"
          num_segments: 10"
          label_spacing: "1"
          name: null
          show_wind: speed
```
### Title

Example with title that is clickable and has 2 nested cards.

```
      - type: custom:expander-card
        child-margin-top: 0.6em
        padding: 0
        title: "Test"
        title-card-button-overlay: true
        title-card-clickable: true
        cards:
          - type: custom:simple-weather-card
            entity: weather.openweathermap
            primary_info:
              - wind_speed
              - wind_bearing
            secondary_info:
              - precipitation
              - precipitation_probability
          - type: custom:hourly-weather
            entity: weather.openweathermap
            icons: true
            show_precipitation_probability: true
            show_precipitation_amounts: true
            forecast_type: "hourly"
            num_segments: 10"
            label_spacing: "1"
            name: null
            show_wind: speed
```

### Title with min-width-expanded

Example with title that is clickable and has 2 nested cards with are automatically expanded when the screen is more than 300px.

```
      - type: custom:expander-card
        child-margin-top: 0.6em
        padding: 0
        title: "Test"
        title-card-button-overlay: true
        title-card-clickable: true
        min-width-expanded: 300
        cards:
          - type: custom:simple-weather-card
            entity: weather.openweathermap
            primary_info:
              - wind_speed
              - wind_bearing
            secondary_info:
              - precipitation
              - precipitation_probability
            name: in Gärtringen
          - type: custom:hourly-weather
            entity: weather.openweathermap
            icons: true
            show_precipitation_probability: true
            show_precipitation_amounts: true
            forecast_type: "hourly"
            num_segments: 10"
            label_spacing: "1"
            show_wind: speed
```

## Set state via action

You can set the state of expander card(s) using the `fire-dom-event` action on any card that supports actions.

1. Set expander card(s) to have `expander-card-id`. Multiple expander cards can shared the same id if you wish to set their state together.
2. Set action on another card using the `fire-dom-event` action.

 ```yaml
  tap_action:
    action: fire-dom-event
    expander-card:
      data:
        expander-card-id: <expander-card-id>
        action: < open | close | toggle >
 ```

Example

### Expander card config

```yaml
    - type: custom:expander-card
      expander-card-id: my-expander-card
```

### Action on another card

```yaml
show_name: true
show_icon: true
type: button
name: Expand my-expander-card
icon: mdi:chevron-down
tap_action:
  action: fire-dom-event
  expander-card:
    data:
      expander-card-id: my-expander-card
      action: open
```

## Card Mod

With the help of the integration [card mod](https://github.com/thomasloven/lovelace-card-mod), the card can be flexibly adapted. This is also possible based on the card status. A CSS class “open” or “close” is always set.

Using an example to set the background based on the status
```
        card_mod:
          style: |
            ha-card.open {
              background: red !important;
            }
            ha-card.close {
              background: #C8A2C8 !important;
            }
```

Only the background of the button
```
        card_mod:
          style: |
            button.open {
              background: red !important;
            }
            button.close {
              background: #C8A2C8 !important;
            }
```

Switching the arrow from right to left
```
        card_mod:
          style: |
            .header {
              flex-direction: row-reverse !important;
            }
```

## Installation

### HACS

Expander-Card is not available in [HACS][hacs] (Home Assistant Community Store) by default, but you can add it as custom repositories.

1. Install HACS if you don't have it already
2. Open HACS in Home Assistant 
3. Add this repository (https://github.com/MelleD/lovelace-expander-card) via HACS Custom repositories ([How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/))

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=MelleD&repository=lovelace-expander-card&category=plugin)


### Manual

1. Download `expander-card.js` file from the [latest release][release-url].
2. Put `expander-card.js` file into your `config/www` folder.
3. Add reference to `expander-card.js` in Dashboard. There's two way to do that:
    - **Using UI:** _Settings_ → _Dashboards_ → _More Options icon_ → _Resources_ → _Add Resource_ → Set _Url_ as `/local/expander-card.js` → Set _Resource type_ as `JavaScript Module`.
      **Note:** If you do not see the Resources menu, you will need to enable _Advanced Mode_ in your _User Profile_
    - **Using YAML:** Add following code to `lovelace` section.
        ```yaml
        resources:
            - url: /local/expander-card.js
              type: module
        ```


## FAQ

### Issue after upgrade to HA 2025.6 
There is/was an issue after upgrading to HA 2025.6 (maybe with newer version is not valid anymore)
See [forum](https://community.home-assistant.io/t/expander-accordion-collapsible-card/738817/56?u=melled) and [issue](https://github.com/MelleD/lovelace-expander-card/issues/506) 
a) For the view type [sections](https://www.home-assistant.io/blog/2024/03/04/dashboard-chapter-1/) `cards` is not working anymore. You have to rename it to `sections`.
Before
 ```yaml
views:
  - title: MyView
    path: my-view
    cards: ...
```

Now
 ```yaml
views:
  - title: MyView
    path: my-view
    sections: ...
```

### Option Gap is not working

If this option doesn't work, check your browser's console output. Your current CSS layout might not support this option.
You can use the `expander-card-display: grid` option to set a layout that supports this option.

## Support

Clone and create a PR to help make the card even better.

Please ⭐️ or sponsor this repo when you like it.

## Sponsor ❤️

<a href="" target="_blank"><img src="https://img.shields.io/static/v1.svg?label=%20&message=PayPal.Me&logo=paypal" alt="PayPal.Me MelleDennis" style="height: auto !important;width: auto !important;" ></a>

<a href="https://www.buymeacoffee.com/melled" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

<!-- Badges -->

[hacs-badge]: https://img.shields.io/badge/hacs-default-orange.svg?style=flat-square
[release-badge]: https://img.shields.io/github/v/release/MelleD/lovelace-expander-card?style=flat-square
[downloads-badge]: https://img.shields.io/github/downloads/MelleD/lovelace-expander-card/total?style=flat-square
[build-badge]: https://img.shields.io/github/actions/workflow/status/MelleD/lovelace-expander-card/build.yml?branch=main&style=flat-square
[paypal-me-badge]: https://img.shields.io/static/v1.svg?label=%20&message=PayPal.Me&logo=paypal
[buy-me-a-coffee-shield]: https://img.shields.io/static/v1.svg?label=%20&message=Buy%20me%20a%20coffee&color=6f4e37&logo=buy%20me%20a%20coffee&logoColor=white

<!-- References -->

[hacs-url]: https://github.com/hacs/integration
[home-assistant]: https://www.home-assistant.io/
[hacs]: https://hacs.xyz
[release-url]: https://github.com/MelleD/lovelace-expander-card/releases
[paypal-me-url]: https://www.paypal.me/MelleDennis
[buy-me-a-coffee-url]: https://www.buymeacoffee.com/melled

