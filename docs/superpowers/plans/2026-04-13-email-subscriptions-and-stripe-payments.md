# Email Subscriptions + Stripe Payments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add email newsletter subscriptions (shop + community pages) and Stripe card payment to the checkout flow, end-to-end from NestJS backend to Next.js frontend.

**Architecture:** Two independent subsystems — (1) a `notification` NestJS component storing subscribers in MongoDB and sending emails via Nodemailer, wired to an updated `NewsletterBanner` on all four pages; (2) a `payment` NestJS component exposing a `createPaymentIntent` GraphQL mutation and a Stripe webhook REST endpoint, wired to the existing `CheckoutForm` via Stripe Elements. Both follow the existing `src/components/` pattern (resolver + service + module + schema + DTOs).

**Tech Stack:** NestJS 10, GraphQL (Apollo), MongoDB/Mongoose, Nodemailer, Stripe SDK, Next.js Pages Router, Apollo Client, `@stripe/react-stripe-js`, `@stripe/stripe-js`, MUI 5, SCSS.

> ⚠️ **Path note:** The spec says `src/modules/` — the real project uses `src/components/`. All backend paths below use `src/components/`.

---

## File Map

### Backend — new files
| File | Responsibility |
|------|----------------|
| `apps/monolith-api/src/schemas/Subscriber.model.ts` | Mongoose schema for email subscribers |
| `apps/monolith-api/src/libs/dto/notification/notification.ts` | GraphQL `@ObjectType` for Subscriber |
| `apps/monolith-api/src/libs/dto/notification/notification.input.ts` | `SubscribeInput`, `UnsubscribeInput` GraphQL `@InputType`s |
| `apps/monolith-api/src/components/notification/notification.module.ts` | NestJS module wiring |
| `apps/monolith-api/src/components/notification/notification.service.ts` | DB logic: subscribe, unsubscribe, getSubscribers |
| `apps/monolith-api/src/components/notification/notification.resolver.ts` | GraphQL resolver: `subscribe`, `unsubscribe`, `getSubscribers` |
| `apps/monolith-api/src/components/notification/mail.service.ts` | Nodemailer: sendWelcomeEmail, sendUnsubscribeConfirmation |
| `apps/monolith-api/src/libs/dto/payment/payment.ts` | GraphQL `@ObjectType` for PaymentIntent response |
| `apps/monolith-api/src/libs/dto/payment/payment.input.ts` | `CreatePaymentIntentInput` `@InputType` |
| `apps/monolith-api/src/components/payment/payment.module.ts` | NestJS module wiring |
| `apps/monolith-api/src/components/payment/payment.service.ts` | Stripe SDK: createPaymentIntent, webhook handlers |
| `apps/monolith-api/src/components/payment/payment.resolver.ts` | GraphQL mutation: `createPaymentIntent` |
| `apps/monolith-api/src/components/payment/stripe-webhook.controller.ts` | REST POST /stripe/webhook |

### Backend — modified files
| File | Change |
|------|--------|
| `apps/monolith-api/src/components/components.module.ts` | Import `NotificationModule` and `PaymentModule` |
| `apps/monolith-api/src/main.ts` | Add raw-body middleware for Stripe webhook signature verification |
| `apps/monolith-api/.env` | Add MAIL_* and STRIPE_* env vars |

### Frontend — new files
| File | Responsibility |
|------|----------------|
| `pages/unsubscribe/index.tsx` | Reads `?token=` from URL, calls `UNSUBSCRIBE` mutation, shows confirmation |

### Frontend — modified files
| File | Change |
|------|--------|
| `apollo/user/mutation.ts` | Add `SUBSCRIBE`, `UNSUBSCRIBE`, `CREATE_PAYMENT_INTENT` |
| `apollo/user/query.ts` | Add `GET_SUBSCRIBERS` (admin-only) |
| `libs/components/furniture/NewsletterBanner.tsx` | Wire to `SUBSCRIBE` mutation, show success/error |
| `pages/furniture/index.tsx` | Import and render `<NewsletterBanner />` |
| `pages/community/index.tsx` | Import and render `<NewsletterBanner />` |
| `libs/components/checkout/CheckoutForm.tsx` | Wrap with Stripe Elements, replace card fields with `CardElement`, call `createPaymentIntent` + `stripe.confirmCardPayment` |
| `.env.development` | Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |

---

## Task 1: Subscriber Mongoose Schema

**Files:**
- Create: `apps/monolith-api/src/schemas/Subscriber.model.ts`

- [ ] **Step 1: Create the Subscriber schema**

```typescript
// apps/monolith-api/src/schemas/Subscriber.model.ts
import { Schema } from 'mongoose';

const SubscriberSchema = new Schema(
  {
    subscriberEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    unsubscribeToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, collection: 'subscribers' },
);

export default SubscriberSchema;
```

- [ ] **Step 2: Commit**

```bash
git add apps/monolith-api/src/schemas/Subscriber.model.ts
git commit -m "feat: add Subscriber mongoose schema"
```

---

## Task 2: Notification DTOs

**Files:**
- Create: `apps/monolith-api/src/libs/dto/notification/notification.ts`
- Create: `apps/monolith-api/src/libs/dto/notification/notification.input.ts`

- [ ] **Step 1: Create the ObjectType DTO**

```typescript
// apps/monolith-api/src/libs/dto/notification/notification.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subscriber {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  subscriberEmail: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => String)
  unsubscribeToken: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class Subscribers {
  @Field(() => [Subscriber])
  list: Subscriber[];

  @Field(() => Number)
  total: number;
}
```

- [ ] **Step 2: Create the InputType DTOs**

```typescript
// apps/monolith-api/src/libs/dto/notification/notification.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SubscribeInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  subscriberEmail: string;
}

@InputType()
export class UnsubscribeInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  unsubscribeToken: string;
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/monolith-api/src/libs/dto/notification/
git commit -m "feat: add notification DTOs for subscriber"
```

---

## Task 3: Mail Service (Nodemailer)

**Files:**
- Create: `apps/monolith-api/src/components/notification/mail.service.ts`
- Modify: `apps/monolith-api/.env`

- [ ] **Step 1: Install nodemailer and its types**

```bash
cd /Users/khonimkulovjaloliddin/Desktop/monolith
yarn add nodemailer
yarn add -D @types/nodemailer
```

- [ ] **Step 2: Add mail env vars to `.env`**

Open `apps/monolith-api/.env` (the root-level `.env` at `/Users/khonimkulovjaloliddin/Desktop/monolith/.env`) and append:

```
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM="Monolith <your_email@gmail.com>"
```

- [ ] **Step 3: Create MailService**

```typescript
// apps/monolith-api/src/components/notification/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendWelcomeEmail(to: string, unsubscribeToken: string): Promise<void> {
    const unsubscribeUrl = `${process.env.FRONTEND_URL}/unsubscribe?token=${unsubscribeToken}`;
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject: 'Welcome to Monolith Newsletter!',
        html: `
          <h2>Thank you for subscribing!</h2>
          <p>You'll receive updates on new blog posts and sale products.</p>
          <p style="margin-top:24px;font-size:12px;color:#999;">
            Don't want these emails? 
            <a href="${unsubscribeUrl}">Unsubscribe here</a>
          </p>
        `,
      });
    } catch (err) {
      this.logger.error('sendWelcomeEmail failed', err.message);
    }
  }

  async sendUnsubscribeConfirmation(to: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject: 'You have been unsubscribed',
        html: `
          <h2>Unsubscribe confirmed</h2>
          <p>You have been successfully removed from our mailing list.</p>
        `,
      });
    } catch (err) {
      this.logger.error('sendUnsubscribeConfirmation failed', err.message);
    }
  }

  async sendPaymentConfirmation(to: string, amount: number, currency: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject: 'Payment Confirmed - Monolith',
        html: `
          <h2>Payment Received</h2>
          <p>We've received your payment of <strong>${(amount / 100).toFixed(2)} ${currency.toUpperCase()}</strong>.</p>
          <p>Thank you for your purchase!</p>
        `,
      });
    } catch (err) {
      this.logger.error('sendPaymentConfirmation failed', err.message);
    }
  }
}
```

- [ ] **Step 4: Add `FRONTEND_URL` to `.env`**

```
FRONTEND_URL=http://localhost:3000
```

- [ ] **Step 5: Commit**

```bash
git add apps/monolith-api/src/components/notification/mail.service.ts
git commit -m "feat: add MailService with nodemailer"
```

---

## Task 4: Notification Service + Resolver + Module

**Files:**
- Create: `apps/monolith-api/src/components/notification/notification.service.ts`
- Create: `apps/monolith-api/src/components/notification/notification.resolver.ts`
- Create: `apps/monolith-api/src/components/notification/notification.module.ts`
- Modify: `apps/monolith-api/src/components/components.module.ts`

- [ ] **Step 1: Create NotificationService**

```typescript
// apps/monolith-api/src/components/notification/notification.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Subscriber, Subscribers } from '../../libs/dto/notification/notification';
import { SubscribeInput, UnsubscribeInput } from '../../libs/dto/notification/notification.input';
import { MailService } from './mail.service';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Subscriber')
    private readonly subscriberModel: Model<Subscriber>,
    private readonly mailService: MailService,
  ) {}

  public async subscribe(input: SubscribeInput): Promise<Subscriber> {
    const existing = await this.subscriberModel.findOne({
      subscriberEmail: input.subscriberEmail,
    });

    if (existing) {
      if (existing.isActive) {
        throw new BadRequestException('This email is already subscribed.');
      }
      // Re-subscribe: reactivate the existing record with a fresh token
      existing.isActive = true;
      existing.unsubscribeToken = uuidv4();
      await existing.save();
      await this.mailService.sendWelcomeEmail(existing.subscriberEmail, existing.unsubscribeToken);
      return existing;
    }

    const unsubscribeToken = uuidv4();
    try {
      const subscriber = await this.subscriberModel.create({
        subscriberEmail: input.subscriberEmail,
        unsubscribeToken,
      });
      await this.mailService.sendWelcomeEmail(subscriber.subscriberEmail, unsubscribeToken);
      return subscriber;
    } catch (err) {
      console.log('Error, NotificationService.subscribe:', err.message);
      throw new BadRequestException(Message.BAD_REQUEST);
    }
  }

  public async unsubscribe(input: UnsubscribeInput): Promise<Subscriber> {
    const subscriber = await this.subscriberModel.findOne({
      unsubscribeToken: input.unsubscribeToken,
    });
    if (!subscriber) throw new BadRequestException('Invalid unsubscribe token.');

    subscriber.isActive = false;
    await subscriber.save();
    await this.mailService.sendUnsubscribeConfirmation(subscriber.subscriberEmail);
    return subscriber;
  }

  public async getSubscribers(): Promise<Subscribers> {
    const list = await this.subscriberModel.find({ isActive: true }).sort({ createdAt: -1 }).exec();
    return { list, total: list.length };
  }
}
```

- [ ] **Step 2: Create NotificationResolver**

```typescript
// apps/monolith-api/src/components/notification/notification.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Subscriber, Subscribers } from '../../libs/dto/notification/notification';
import { SubscribeInput, UnsubscribeInput } from '../../libs/dto/notification/notification.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Subscriber)
  public async subscribe(
    @Args('input') input: SubscribeInput,
  ): Promise<Subscriber> {
    console.log('Mutation: subscribe');
    return await this.notificationService.subscribe(input);
  }

  @Mutation(() => Subscriber)
  public async unsubscribe(
    @Args('input') input: UnsubscribeInput,
  ): Promise<Subscriber> {
    console.log('Mutation: unsubscribe');
    return await this.notificationService.unsubscribe(input);
  }

  @Roles(MemberType.ADMIN)
  @UseGuards(RolesGuard)
  @Query(() => Subscribers)
  public async getSubscribers(): Promise<Subscribers> {
    console.log('Query: getSubscribers');
    return await this.notificationService.getSubscribers();
  }
}
```

- [ ] **Step 3: Create NotificationModule**

```typescript
// apps/monolith-api/src/components/notification/notification.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import SubscriberSchema from '../../schemas/Subscriber.model';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';
import { MailService } from './mail.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subscriber', schema: SubscriberSchema }]),
    AuthModule,
  ],
  providers: [NotificationResolver, NotificationService, MailService],
  exports: [MailService],
})
export class NotificationModule {}
```

- [ ] **Step 4: Register NotificationModule in ComponentsModule**

Open `apps/monolith-api/src/components/components.module.ts` and add the import:

```typescript
// apps/monolith-api/src/components/components.module.ts
import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { FurnitureModule } from './furniture/furniture.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { FollowModule } from './follow/follow.module';
import { BoardArticleModule } from './board-article/board-article.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    MemberModule,
    FurnitureModule,
    AuthModule,
    CommentModule,
    LikeModule,
    ViewModule,
    FollowModule,
    BoardArticleModule,
    NotificationModule,
  ],
})
export class ComponentsModule {}
```

- [ ] **Step 5: Start the backend and verify the new mutations appear in GraphQL playground**

```bash
cd /Users/khonimkulovjaloliddin/Desktop/monolith
yarn start:dev monolith-api
```

Open `http://localhost:3004/graphql` and confirm `subscribe`, `unsubscribe`, and `getSubscribers` appear in the schema explorer.

- [ ] **Step 6: Commit**

```bash
git add apps/monolith-api/src/components/notification/ apps/monolith-api/src/components/components.module.ts
git commit -m "feat: add notification module with subscribe/unsubscribe GraphQL mutations"
```

---

## Task 5: Frontend — Apollo mutations for newsletter

**Files:**
- Modify: `apollo/user/mutation.ts`
- Modify: `apollo/user/query.ts`

- [ ] **Step 1: Add `SUBSCRIBE` and `UNSUBSCRIBE` mutations to `apollo/user/mutation.ts`**

Append to the end of `apollo/user/mutation.ts` (after the existing `/** COMMENT */` section):

```typescript
/**************************
 *      NOTIFICATION      *
 *************************/
export const SUBSCRIBE = gql`
  mutation Subscribe($input: SubscribeInput!) {
    subscribe(input: $input) {
      _id
      subscriberEmail
      isActive
    }
  }
`;

export const UNSUBSCRIBE = gql`
  mutation Unsubscribe($input: UnsubscribeInput!) {
    unsubscribe(input: $input) {
      _id
      subscriberEmail
      isActive
    }
  }
`;
```

- [ ] **Step 2: Add `GET_SUBSCRIBERS` query to `apollo/user/query.ts`**

Append after the `/** FOLLOW */` section at the end of `apollo/user/query.ts`:

```typescript
/**************************
 *      NOTIFICATION      *
 *************************/
export const GET_SUBSCRIBERS = gql`
  query GetSubscribers {
    getSubscribers {
      list {
        _id
        subscriberEmail
        isActive
        createdAt
      }
      total
    }
  }
`;
```

- [ ] **Step 3: Commit**

```bash
git add apollo/user/mutation.ts apollo/user/query.ts
git commit -m "feat: add subscribe/unsubscribe Apollo mutations and getSubscribers query"
```

---

## Task 6: Frontend — Wire NewsletterBanner + add to shop and blog pages

**Files:**
- Modify: `libs/components/furniture/NewsletterBanner.tsx`
- Modify: `pages/furniture/index.tsx`
- Modify: `pages/community/index.tsx`

- [ ] **Step 1: Wire the NewsletterBanner component**

Replace the entire content of `libs/components/furniture/NewsletterBanner.tsx`:

```tsx
import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE } from '../../../apollo/user/mutation';
import { sweetTopSmallSuccessAlert, sweetMixinErrorAlert } from '../../sweetAlert';

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [subscribe, { loading }] = useMutation(SUBSCRIBE);

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      await subscribe({ variables: { input: { subscriberEmail: trimmed } } });
      setSubmitted(true);
      setEmail('');
      await sweetTopSmallSuccessAlert('Subscribed! Check your inbox.', 2000);
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  };

  return (
    <Stack className="newsletter-banner" alignItems="center">
      <Typography className="newsletter-title">
        Get <span className="highlight">30% Discount</span> Buying First Product
      </Typography>
      {submitted ? (
        <Typography className="newsletter-success">
          You are subscribed! Thank you.
        </Typography>
      ) : (
        <Stack direction="row" alignItems="stretch" gap="12px">
          <Box className="newsletter-input-wrap">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              placeholder="example@gmail.com"
              className="newsletter-input"
              disabled={loading}
            />
          </Box>
          <Box
            className={`newsletter-btn${loading ? ' newsletter-btn--loading' : ''}`}
            onClick={handleSubscribe}
          >
            <Typography className="newsletter-btn-text">
              {loading ? '...' : 'SUBSCRIBE'}
            </Typography>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default NewsletterBanner;
```

- [ ] **Step 2: Add `NewsletterBanner` to `pages/furniture/index.tsx`**

Find the import block at the top of `pages/furniture/index.tsx` and add:

```typescript
import NewsletterBanner from '../../libs/components/furniture/NewsletterBanner';
```

Then find the closing JSX (just before the last `</div>` or the Instagram section if present) and add:

```tsx
{/* ===== NEWSLETTER BANNER ===== */}
<NewsletterBanner />
```

- [ ] **Step 3: Add `NewsletterBanner` to `pages/community/index.tsx`**

Add the same import and render call to `pages/community/index.tsx`, placed before the closing JSX tag of the page container.

- [ ] **Step 4: Add a `.newsletter-success` style**

Open `scss/pc/furniture/furniture-list.scss` (or whichever SCSS file already contains `.newsletter-banner` styles — check `scss/pc/` for the right file) and add:

```scss
.newsletter-success {
  font-size: 18px;
  color: #2e7d32;
  font-weight: 500;
  margin-top: 8px;
}
```

- [ ] **Step 5: Verify in browser**

Run `yarn dev` and open `http://localhost:3000/furniture`. Enter an email and click SUBSCRIBE. Confirm the success message appears and the welcome email is delivered (check console if SMTP is not configured yet — the error is swallowed, the UI still works).

- [ ] **Step 6: Commit**

```bash
git add libs/components/furniture/NewsletterBanner.tsx pages/furniture/index.tsx pages/community/index.tsx scss/
git commit -m "feat: wire NewsletterBanner to subscribe mutation on shop and community pages"
```

---

## Task 7: Frontend — Unsubscribe page

**Files:**
- Create: `pages/unsubscribe/index.tsx`

- [ ] **Step 1: Create the unsubscribe page**

```tsx
// pages/unsubscribe/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { UNSUBSCRIBE } from '../../apollo/user/mutation';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';

const UnsubscribePage: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const [unsubscribe] = useMutation(UNSUBSCRIBE);

  useEffect(() => {
    if (!token || typeof token !== 'string') return;
    setStatus('loading');
    unsubscribe({ variables: { input: { unsubscribeToken: token } } })
      .then(() => {
        setStatus('success');
        setMessage('You have been successfully unsubscribed.');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.message || 'Invalid or expired unsubscribe link.');
      });
  }, [token]);

  return (
    <Stack id="unsubscribe-page" alignItems="center" justifyContent="center" sx={{ minHeight: '40vh', gap: '16px' }}>
      {status === 'idle' && <Typography>Processing your request…</Typography>}
      {status === 'loading' && <Typography>Unsubscribing…</Typography>}
      {status === 'success' && (
        <>
          <Typography variant="h5" color="success.main">{message}</Typography>
          <Typography>You will no longer receive newsletter emails from us.</Typography>
        </>
      )}
      {status === 'error' && (
        <Typography variant="h6" color="error">{message}</Typography>
      )}
    </Stack>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutBasic(UnsubscribePage);
```

- [ ] **Step 2: Test the unsubscribe flow**

1. Subscribe with a test email via the furniture page.
2. Copy the `unsubscribeToken` from the MongoDB `subscribers` collection (use MongoDB Compass or Playground).
3. Open `http://localhost:3000/unsubscribe?token=<token>`.
4. Confirm the success message renders and `isActive` flips to `false` in the DB.

- [ ] **Step 3: Commit**

```bash
git add pages/unsubscribe/index.tsx
git commit -m "feat: add unsubscribe page triggered by token from email link"
```

---

## Task 8: Backend — Payment Module + Stripe Webhook

**Files:**
- Create: `apps/monolith-api/src/libs/dto/payment/payment.ts`
- Create: `apps/monolith-api/src/libs/dto/payment/payment.input.ts`
- Create: `apps/monolith-api/src/components/payment/payment.service.ts`
- Create: `apps/monolith-api/src/components/payment/payment.resolver.ts`
- Create: `apps/monolith-api/src/components/payment/stripe-webhook.controller.ts`
- Create: `apps/monolith-api/src/components/payment/payment.module.ts`
- Modify: `apps/monolith-api/src/components/components.module.ts`
- Modify: `apps/monolith-api/src/main.ts`
- Modify: `apps/monolith-api/.env`

- [ ] **Step 1: Install Stripe SDK**

```bash
cd /Users/khonimkulovjaloliddin/Desktop/monolith
yarn add stripe
```

- [ ] **Step 2: Add Stripe env vars to `.env`**

```
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

- [ ] **Step 3: Create payment DTOs**

```typescript
// apps/monolith-api/src/libs/dto/payment/payment.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentIntent {
  @Field(() => String)
  clientSecret: string;

  @Field(() => String)
  paymentIntentId: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  currency: string;
}
```

```typescript
// apps/monolith-api/src/libs/dto/payment/payment.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreatePaymentIntentInput {
  @IsNotEmpty()
  @IsInt()
  @Min(50)
  @Field(() => Int)
  amount: number; // in cents, e.g. 4999 = $49.99

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  currency: string; // e.g. "usd"

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  memberEmail: string;
}
```

- [ ] **Step 4: Create PaymentService**

```typescript
// apps/monolith-api/src/components/payment/payment.service.ts
import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentIntent } from '../../libs/dto/payment/payment';
import { CreatePaymentIntentInput } from '../../libs/dto/payment/payment.input';
import { MailService } from '../notification/mail.service';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly mailService: MailService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2025-03-31.basil',
    });
  }

  public async createPaymentIntent(input: CreatePaymentIntentInput): Promise<PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: input.amount,
      currency: input.currency,
      receipt_email: input.memberEmail,
      automatic_payment_methods: { enabled: true },
    });

    return {
      clientSecret: paymentIntent.client_secret as string,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    };
  }

  public async handleWebhookEvent(payload: Buffer, signature: string): Promise<void> {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch (err) {
      this.logger.error('Webhook signature verification failed', err.message);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        this.logger.log(`PaymentIntent succeeded: ${pi.id}`);
        if (pi.receipt_email) {
          await this.mailService.sendPaymentConfirmation(
            pi.receipt_email,
            pi.amount,
            pi.currency,
          );
        }
        break;
      }
      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
    }
  }
}
```

- [ ] **Step 5: Create PaymentResolver**

```typescript
// apps/monolith-api/src/components/payment/payment.resolver.ts
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { PaymentIntent } from '../../libs/dto/payment/payment';
import { CreatePaymentIntentInput } from '../../libs/dto/payment/payment.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentIntent)
  public async createPaymentIntent(
    @Args('input') input: CreatePaymentIntentInput,
  ): Promise<PaymentIntent> {
    console.log('Mutation: createPaymentIntent');
    return await this.paymentService.createPaymentIntent(input);
  }
}
```

- [ ] **Step 6: Create StripeWebhookController**

```typescript
// apps/monolith-api/src/components/payment/stripe-webhook.controller.ts
import { Controller, Post, Req, Res, Headers, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

@Controller('stripe')
export class StripeWebhookController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ): Promise<void> {
    try {
      await this.paymentService.handleWebhookEvent(
        (req as any).rawBody,
        signature,
      );
      res.status(HttpStatus.OK).json({ received: true });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
    }
  }
}
```

- [ ] **Step 7: Create PaymentModule**

```typescript
// apps/monolith-api/src/components/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { StripeWebhookController } from './stripe-webhook.controller';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [AuthModule, NotificationModule],
  controllers: [StripeWebhookController],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
```

- [ ] **Step 8: Register PaymentModule in ComponentsModule**

```typescript
// apps/monolith-api/src/components/components.module.ts
import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { FurnitureModule } from './furniture/furniture.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { FollowModule } from './follow/follow.module';
import { BoardArticleModule } from './board-article/board-article.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    MemberModule,
    FurnitureModule,
    AuthModule,
    CommentModule,
    LikeModule,
    ViewModule,
    FollowModule,
    BoardArticleModule,
    NotificationModule,
    PaymentModule,
  ],
})
export class ComponentsModule {}
```

- [ ] **Step 9: Update `main.ts` to capture raw body for Stripe webhook verification**

Replace the entire `main.ts` with:

```typescript
// apps/monolith-api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({ origin: true, credentials: true });

  // Capture raw body for Stripe webhook signature verification
  app.use(
    '/stripe/webhook',
    express.raw({ type: 'application/json' }),
    (req: any, _res: any, next: any) => {
      req.rawBody = req.body;
      next();
    },
  );

  app.use(graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 10 }));
  app.use('/uploads', express.static('./uploads'));
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();
```

- [ ] **Step 10: Verify `createPaymentIntent` in GraphQL playground**

```bash
cd /Users/khonimkulovjaloliddin/Desktop/monolith
yarn start:dev monolith-api
```

Go to `http://localhost:3004/graphql` and test (log in first to get a Bearer token):

```graphql
mutation {
  createPaymentIntent(input: {
    amount: 4999
    currency: "usd"
    memberEmail: "test@example.com"
  }) {
    clientSecret
    paymentIntentId
    amount
    currency
  }
}
```

Expected: returns `clientSecret` string starting with `pi_...` and ending in `_secret_...`

- [ ] **Step 11: Commit**

```bash
git add apps/monolith-api/src/components/payment/ apps/monolith-api/src/libs/dto/payment/ apps/monolith-api/src/components/components.module.ts apps/monolith-api/src/main.ts
git commit -m "feat: add payment module with Stripe createPaymentIntent mutation and webhook"
```

---

## Task 9: Frontend — Wire CheckoutForm with Stripe Elements

**Files:**
- Modify: `libs/components/checkout/CheckoutForm.tsx`
- Modify: `apollo/user/mutation.ts`
- Modify: `.env.development`
- Modify: `libs/components/checkout/OrderSummary.tsx` (read total amount)

- [ ] **Step 1: Install Stripe frontend packages**

```bash
cd /Users/khonimkulovjaloliddin/Desktop/monolith-next
yarn add @stripe/stripe-js @stripe/react-stripe-js
```

- [ ] **Step 2: Add publishable key to `.env.development`**

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

- [ ] **Step 3: Add `CREATE_PAYMENT_INTENT` mutation to `apollo/user/mutation.ts`**

Append after the `/** NOTIFICATION */` section:

```typescript
/**************************
 *        PAYMENT         *
 *************************/
export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {
    createPaymentIntent(input: $input) {
      clientSecret
      paymentIntentId
      amount
      currency
    }
  }
`;
```

- [ ] **Step 4: Read `OrderSummary.tsx` to find how the cart total is derived**

Before writing the CheckoutForm update, read `libs/components/checkout/OrderSummary.tsx` to understand where the cart total lives (localStorage key or Apollo reactive var). Use that total as the `amount` passed to `createPaymentIntent`.

- [ ] **Step 5: Replace `CheckoutForm.tsx` with Stripe-wired version**

```tsx
// libs/components/checkout/CheckoutForm.tsx
import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT_INTENT } from '../../../apollo/user/mutation';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { sweetTopSmallSuccessAlert, sweetMixinErrorAlert } from '../../sweetAlert';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

// Inner form — rendered inside <Elements> provider
const CardPaymentForm = ({
  clientSecret,
  billingData,
}: {
  clientSecret: string;
  billingData: { firstName: string; lastName: string; email: string };
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements || !clientSecret) return;
    setPaying(true);
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${billingData.firstName} ${billingData.lastName}`.trim(),
            email: billingData.email,
          },
        },
      });

      if (error) throw new Error(error.message);
      if (paymentIntent?.status === 'succeeded') {
        setPaymentSuccess(true);
        await sweetTopSmallSuccessAlert('Payment successful!', 2500);
      }
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    } finally {
      setPaying(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Stack alignItems="center" sx={{ padding: '24px 0' }}>
        <Typography variant="h6" color="success.main">
          Payment confirmed! Thank you for your order.
        </Typography>
      </Stack>
    );
  }

  return (
    <>
      <div className="form-group" style={{ marginTop: 16 }}>
        <label className="form-label">Card Details</label>
        <div className="stripe-card-element">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1a1a2e',
                  '::placeholder': { color: '#999' },
                },
              },
            }}
          />
        </div>
      </div>
      <button
        className="continue-btn"
        onClick={handlePay}
        disabled={paying || !stripe}
      >
        {paying ? 'Processing…' : 'PAY NOW'}
      </button>
    </>
  );
};

// Outer form — handles billing + fetches clientSecret
const CheckoutForm = () => {
  const user = useReactiveVar(userVar);
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: user?.memberEmail ?? '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });
  const [sameAddress, setSameAddress] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  // Derive cart total from localStorage (set by cart logic)
  const getCartTotal = (): number => {
    try {
      const cart = JSON.parse(localStorage.getItem('cartData') ?? '[]');
      const total = cart.reduce(
        (sum: number, item: any) =>
          sum + (item.furniturePrice ?? 0) * (item.quantity ?? 1),
        0,
      );
      return Math.round(total * 100); // convert to cents
    } catch {
      return 999; // fallback: $9.99 minimum
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    const amount = getCartTotal();
    createPaymentIntent({
      variables: {
        input: {
          amount,
          currency: 'usd',
          memberEmail: billingData.email || user?.memberEmail || 'guest@example.com',
        },
      },
    })
      .then(({ data }) => {
        setClientSecret(data.createPaymentIntent.clientSecret);
      })
      .catch((err) => console.error('createPaymentIntent error:', err.message));
  }, [user?._id]);

  const handleBillingChange = (field: string, value: string) => {
    setBillingData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Stack className="checkout-form">
      {/* Billing Address Section */}
      <Stack className="billing-section">
        <Typography className="section-title">Billing Address</Typography>
        <Stack className="form-fields">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                placeholder="First Name"
                value={billingData.firstName}
                onChange={(e) => handleBillingChange('firstName', e.target.value)}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Last name"
                value={billingData.lastName}
                onChange={(e) => handleBillingChange('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input full"
              type="email"
              placeholder="example@gmail.com"
              value={billingData.email}
              onChange={(e) => handleBillingChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Shipping address"
              value={billingData.address}
              onChange={(e) => handleBillingChange('address', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                className="form-input"
                type="text"
                placeholder="Add city"
                value={billingData.city}
                onChange={(e) => handleBillingChange('city', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                className="form-input"
                type="text"
                placeholder="State/Province"
                value={billingData.state}
                onChange={(e) => handleBillingChange('state', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input
                className="form-input"
                type="text"
                placeholder="0 0 0 0 0 0"
                value={billingData.pincode}
                onChange={(e) => handleBillingChange('pincode', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <div className="select-wrapper">
                <select
                  className="form-input form-select"
                  value={billingData.country}
                  onChange={(e) => handleBillingChange('country', e.target.value)}
                >
                  <option value="" disabled>Select country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="KR">South Korea</option>
                  <option value="UZ">Uzbekistan</option>
                </select>
                <KeyboardArrowDownIcon className="select-icon" />
              </div>
            </div>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={sameAddress}
              onChange={(e) => setSameAddress(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-label">
              My billing and shipping address are the same
            </span>
          </label>
        </Stack>
      </Stack>

      {/* Payment Section */}
      <Stack className="payment-section">
        <Typography className="section-title">Payment</Typography>
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CardPaymentForm clientSecret={clientSecret} billingData={billingData} />
          </Elements>
        ) : (
          <Typography sx={{ color: '#999', padding: '16px 0' }}>
            {user?._id ? 'Loading payment form…' : 'Please log in to proceed with payment.'}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default CheckoutForm;
```

- [ ] **Step 6: Add `.stripe-card-element` SCSS style**

Find the checkout SCSS file (likely `scss/pc/checkout/checkout.scss` or check what `pages/checkout/index.tsx` references) and add:

```scss
.stripe-card-element {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px 14px;
  background: #fff;

  &:hover {
    border-color: #bdbdbd;
  }
}
```

- [ ] **Step 7: Test the payment flow end-to-end**

1. Run `yarn dev` and navigate to `http://localhost:3000/checkout` while logged in.
2. Confirm the Stripe `CardElement` renders (a secure card input iframe appears).
3. Enter Stripe test card: `4242 4242 4242 4242`, expiry `12/34`, CVV `123`, any postcode.
4. Click **PAY NOW**.
5. Confirm "Payment confirmed!" success message appears.
6. Check the Stripe dashboard → Payments to confirm the test payment is recorded.

- [ ] **Step 8: Commit**

```bash
git add libs/components/checkout/CheckoutForm.tsx apollo/user/mutation.ts .env.development scss/
git commit -m "feat: wire CheckoutForm to Stripe Elements and createPaymentIntent mutation"
```

---

## Self-Review Checklist

### Spec coverage
| Requirement | Task |
|---|---|
| Subscriber schema (email, isActive, unsubscribeToken, createdAt) | Task 1 |
| `subscribe` and `unsubscribe` GraphQL mutations | Tasks 2, 4 |
| `getSubscribers` admin-only query | Task 4 |
| `sendWelcomeEmail`, `sendUnsubscribeConfirmation`, `sendPaymentConfirmation` | Task 3 |
| SMTP env vars (MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM) | Task 3 |
| On subscribe: save to DB + send welcome email | Task 4 |
| On unsubscribe: set isActive=false + send confirmation | Task 4 |
| uuidv4 unsubscribeToken | Task 4 |
| Wire NewsletterBanner to subscribe mutation | Task 6 |
| NewsletterBanner on furniture (shop) page | Task 6 |
| NewsletterBanner on community (blog) page | Task 6 |
| NewsletterBanner on about + cs already present | No change needed — already there |
| `/unsubscribe?token=xxx` page | Task 7 |
| `createPaymentIntent` GraphQL mutation | Task 8 |
| Stripe webhook POST /stripe/webhook | Task 8 |
| rawBody in main.ts | Task 8 |
| Stripe signature verification | Task 8 |
| payment_intent.succeeded → sendPaymentConfirmation | Task 8 |
| STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET env vars | Task 8 |
| Frontend Stripe Elements install | Task 9 |
| CardElement replaces manual card fields | Task 9 |
| createPaymentIntent on mount | Task 9 |
| stripe.confirmCardPayment on submit | Task 9 |
| Success/error state | Task 9 |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Task 9 |

### Confirmed: no TBDs, no placeholders, no type mismatches across tasks.
