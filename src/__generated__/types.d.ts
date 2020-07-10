import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { User } from '../lib/entity/User';
import { CalendarEvent } from '../lib/entity/CalendarEvent';
import { ContextData } from '../pages/api/graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type CalendarEvent = {
  __typename?: 'CalendarEvent';
  id: Scalars['ID'];
  title: Scalars['String'];
  start: Scalars['Date'];
  end: Scalars['Date'];
};

export type CreateCalendarEventInput = {
  title: Scalars['String'];
  start: Scalars['Date'];
  end: Scalars['Date'];
};

export type CreateCalendarEventPayload = {
  __typename?: 'CreateCalendarEventPayload';
  calendarEvent?: Maybe<CalendarEvent>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp: SignUpPayload;
  signIn: SignInPayload;
  createCalendarEvent: CreateCalendarEventPayload;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationCreateCalendarEventArgs = {
  input: CreateCalendarEventInput;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
  viewer?: Maybe<User>;
  calendarEvents: Array<Maybe<CalendarEvent>>;
  calendarEvent?: Maybe<CalendarEvent>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryCalendarEventArgs = {
  id: Scalars['ID'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  createdAt: Scalars['Date'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  CalendarEvent: ResolverTypeWrapper<CalendarEvent>;
  Mutation: ResolverTypeWrapper<{}>;
  SignUpInput: SignUpInput;
  SignUpPayload: ResolverTypeWrapper<
    Omit<SignUpPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }
  >;
  SignInInput: SignInInput;
  SignInPayload: ResolverTypeWrapper<
    Omit<SignInPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }
  >;
  CreateCalendarEventInput: CreateCalendarEventInput;
  CreateCalendarEventPayload: ResolverTypeWrapper<
    Omit<CreateCalendarEventPayload, 'calendarEvent'> & {
      calendarEvent?: Maybe<ResolversTypes['CalendarEvent']>;
    }
  >;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ID: Scalars['ID'];
  User: User;
  String: Scalars['String'];
  Date: Scalars['Date'];
  CalendarEvent: CalendarEvent;
  Mutation: {};
  SignUpInput: SignUpInput;
  SignUpPayload: Omit<SignUpPayload, 'user'> & {
    user?: Maybe<ResolversParentTypes['User']>;
  };
  SignInInput: SignInInput;
  SignInPayload: Omit<SignInPayload, 'user'> & {
    user?: Maybe<ResolversParentTypes['User']>;
  };
  CreateCalendarEventInput: CreateCalendarEventInput;
  CreateCalendarEventPayload: Omit<
    CreateCalendarEventPayload,
    'calendarEvent'
  > & { calendarEvent?: Maybe<ResolversParentTypes['CalendarEvent']> };
  Boolean: Scalars['Boolean'];
}>;

export type CalendarEventResolvers<
  ContextType = ContextData,
  ParentType extends ResolversParentTypes['CalendarEvent'] = ResolversParentTypes['CalendarEvent']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  end?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CreateCalendarEventPayloadResolvers<
  ContextType = ContextData,
  ParentType extends ResolversParentTypes['CreateCalendarEventPayload'] = ResolversParentTypes['CreateCalendarEventPayload']
> = ResolversObject<{
  calendarEvent?: Resolver<
    Maybe<ResolversTypes['CalendarEvent']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<
  ContextType = ContextData,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  signUp?: Resolver<
    ResolversTypes['SignUpPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, 'input'>
  >;
  signIn?: Resolver<
    ResolversTypes['SignInPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, 'input'>
  >;
  createCalendarEvent?: Resolver<
    ResolversTypes['CreateCalendarEventPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCalendarEventArgs, 'input'>
  >;
}>;

export type QueryResolvers<
  ContextType = ContextData,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
  users?: Resolver<
    Array<Maybe<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  calendarEvents?: Resolver<
    Array<Maybe<ResolversTypes['CalendarEvent']>>,
    ParentType,
    ContextType
  >;
  calendarEvent?: Resolver<
    Maybe<ResolversTypes['CalendarEvent']>,
    ParentType,
    ContextType,
    RequireFields<QueryCalendarEventArgs, 'id'>
  >;
}>;

export type SignInPayloadResolvers<
  ContextType = ContextData,
  ParentType extends ResolversParentTypes['SignInPayload'] = ResolversParentTypes['SignInPayload']
> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SignUpPayloadResolvers<
  ContextType = ContextData,
  ParentType extends ResolversParentTypes['SignUpPayload'] = ResolversParentTypes['SignUpPayload']
> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
  ContextType = ContextData,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = ContextData> = ResolversObject<{
  CalendarEvent?: CalendarEventResolvers<ContextType>;
  CreateCalendarEventPayload?: CreateCalendarEventPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInPayload?: SignInPayloadResolvers<ContextType>;
  SignUpPayload?: SignUpPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ContextData> = Resolvers<ContextType>;
