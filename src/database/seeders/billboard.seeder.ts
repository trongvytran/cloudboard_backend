import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Billboard } from '../../billboards/entities/billboard.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { District } from '../../districts/entities/district.entity';
import { City } from '../../cities/entities/city.entity';
import { faker } from '@faker-js/faker/locale/vi';

@Injectable()
export class BillboardSeeder {
  constructor(
    @InjectRepository(Billboard)
    private billboardRepository: Repository<Billboard>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async run() {
    const user = await this.userRepository.findOneBy({ id: 1 });
    const city = await this.cityRepository.findOneBy({ name: 'Ho Chi Minh' });
    const subscription = await this.subscriptionRepository.findOneBy({ id: 1 });
    const districts = await this.districtRepository.find({});
    const imageUrl = ["https://futuribile.org/wp-content/uploads/2020/09/confused.com_100820_adshellivelondon_pfb_cv19-1597663300.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlVaaQ3pfkMzGiEXpq0JotG89Q_nT3lkWaw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThhAjrT59PJJUURooTeo-kU3ksb-FY12FJ_g&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK8UkbKRyJAuaDl6lqxj8xbydkyyGzANvaLw&usqp=CAU",
      "https://nyxawards.com/marcom/upload/entry/files/NME101200/1621905037file_2929.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSXf1fSBhKPzx6JGZAcgbBhXHAH6U7i3gkCg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVlBAEoBmPQ8_Bqka-c410z5-OMxaMAGHSEQ&usqp=CAU",
      "https://blog.hubspot.com/hs-fs/hub/53/file-604348300-jpg/blog/coops_paint%2C_nationwide.jpg?width=650&name=coops_paint%2C_nationwide.jpg",
      "https://blog.hubspot.com/hs-fs/hub/53/file-602984142-jpg/blog/Formula-Bite-Billboard.jpg?width=650&name=Formula-Bite-Billboard.jpg",
      "https://blog.hubspot.com/hs-fs/hub/53/file-594866224-jpg/all_you_can_eat.jpg?width=650&name=all_you_can_eat.jpg",
      "https://blog.hubspot.com/hs-fs/hub/53/file-599287603-jpg/tylenol-billboard.jpg?width=650&name=tylenol-billboard.jpg",
      "https://blog.hubspot.com/hs-fs/hub/53/file-601615941-jpg/archive/panasonic-_ear_and_nose_trimmer.jpg?width=650&name=panasonic-_ear_and_nose_trimmer.jpg",
      "https://blog.hubspot.com/hs-fs/hub/53/file-601633871-jpg/the-economist-light-bulb.jpg?width=650&name=the-economist-light-bulb.jpg",
      "https://blog.hubspot.com/hs-fs/hub/53/file-601630376-jpg/makers-mark--billboard.jpg?width=650&name=makers-mark--billboard.jpg",
      "https://blog.hubspot.com/hs-fs/hub/53/file-599280683-jpg/nike_tug_boat-_billboard.jpg?width=650&name=nike_tug_boat-_billboard.jpg",
      "https://image.made-in-china.com/202f0j00aZjEzncgJLkQ/Big-Size-Unipole-Advertising-Tri-Action-Billboard-F3V-136-.jpg",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/4-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/3-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/2-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/7-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Untitled-design-34-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/10-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/12-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/13-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Royal-billboard-ad.jpg",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Untitled-design-37-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Untitled-design-38-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/19-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/52d671c0fcc68aa03f4bad2cc81cf873.jpg",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/23-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/BMW-Audi-Checkmate-billboard-ad.jpg",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/25-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/27-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/spotify-2016-ad-campaign-fb2-1.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Netflix-billboard-ad.jpg",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Screenshot-2020-07-06-at-13.45.37.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/phuket-ill-go-590x442-1.jpg",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/2667b3682cc2cea9ea6a53a4fbf7215d.jpg",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Untitled-design-29-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/38-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/39-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/407872618_080d0248b2_b.jpg",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Untitled-design-31-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Untitled-design-32-1536x768.png",
      "https://1b1hbl4cfc9w137qvr3zlgvk-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/Untitled-design-30-1536x768.png",
      "https://www.designrush.com/uploads/users/customer-12/image_1530828712_ZxgrAtd06BRMzCijQddYzOrKSV8LwVVeo99jfmGb.jpeg",
      "https://www.designrush.com/uploads/users/customer-12/image_1530828950_1AFJqQsPYVftGYFwApJcxrWNbJaMhrWCWpJ30rIG.jpeg",
      "https://www.designrush.com/uploads/users/customer-12/image_1530828461_P7vy1Nez0r2SDmOfmheD1NiAamdOdLDzcgafZ5A6.jpeg",
      "https://www.designrush.com/uploads/users/customer-12/image_1530828491_tcfcM82RO3Rf7DFci8OV0YDp7oksRSwDGAyBcJVS.jpeg",
      "https://www.designrush.com/uploads/users/customer-12/image_1530828556_BLRaFiOH4glih5Fl6AbshYOM65iwth9QW6JYVgKX.jpeg",
      "https://www.designrush.com/uploads/users/customer-12/image_1530828584_F9OJlpivZTfIma7eqGZaRNFVQCvvxjHN1AHzCCyj.jpeg",
    ];
    const duration = [3, 6, 12, 24, 36];
    const billboardData = [];
    for (let i = 0; i < 50; i++) {
      const districtRandom = Math.floor(Math.random() * districts.length);
      const durationRandom = Math.floor(Math.random() * duration.length);
      const imageUrlRandom = Math.floor(Math.random() * imageUrl.length);

      billboardData.push({
        lat: faker.datatype.float({ min: -1000, max: 1000 }),
        long: faker.datatype.float({ min: -1000, max: 1000 }),
        name: faker.commerce.productAdjective() + ' ' + 'Billboard',
        description: faker.lorem.paragraphs(),
        height: faker.datatype.number({ min: 30, max: 60 }),
        width: faker.datatype.number({ min: 30, max: 60 }),
        address: faker.address.streetAddress(),
        price: '100.000.000₫ - 150.000.000₫',
        imageUrl: imageUrl[imageUrlRandom],
        videoUrl:
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        duration: `${duration[durationRandom]} months`,
        expiredAt: new Date(),
        city: city,
        user: user,
        subscription: subscription,
        district: districts[districtRandom],
        ward: { id: 1, name: 'Da Kao' },
      });
    }
    await this.billboardRepository.insert(billboardData);
  }
}
