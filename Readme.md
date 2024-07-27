#### table data:

### user:

| Parameter       | Type      | Description |
| :-------------- | :-------- | :---------- |
| `id`            | `integer` | user's id   |
| `name`          | `string`  | user's name |
| `mobile_number` | `number`  | primary key |

### puja:

| Parameter                | Type      | Description               |
| :----------------------- | :-------- | :------------------------ |
| `id`                     | `integer` | primary key               |
| `cardImageUrl`           | `string`  | card Image                |
| `eventName`              | `string`  | event name                |
| `eventHeading`           | `string`  | event heading             |
| `eventTagline`           | `string`  | event tagline             |
| `templeName`             | `string`  | which temple              |
| `templeLocatedCity`      | `string`  | which city                |
| `templeLocatedDistrict`  | `string`  | which District            |
| `date`                   | `date`    | which day it is happening |
| `hostName`               | `string`  | who is hosting the puja   |
| `aboutPujaHeading`       | `string`  | about puja heading        |
| `aboutPujaDescription`   | `string`  | about puja description    |
| `aboutTempleDescription` | `string`  | about temple description  |

### puja Carousel Image:

| Parameter          | Type      | Description        |
| :----------------- | :-------- | :----------------- |
| `id`               | `integer` | primary key        |
| `image_id`         | `number`  | id                 |
| `carouselImageUrl` | `string`  | image for carousel |

### puja benefits:

| Parameter             | Type      | Description          |
| :-------------------- | :-------- | :------------------- |
| `id`                  | `integer` | primary key          |
| `benefitsId`          | `integer` | id                   |
| `benefitsImage`       | `string`  | benefits image       |
| `benefitsHeading`     | `string`  | benefits heading     |
| `benefitsDescription` | `string`  | benefits description |

### puja process:

| Parameter                | Type      | Description                      |
| :----------------------- | :-------- | :------------------------------- |
| `id`                     | `integer` | linked to puja table             |
| `pujaProcessId`          | `integer` | id                               |
| `pujaProcessHeading`     | `string`  | puja process section heading     |
| `pujaProcessDescription` | `string`  | puja process section description |
