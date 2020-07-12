import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISODate: any;
};


export type CalendarEvent = {
  __typename?: 'CalendarEvent';
  id: Scalars['ID'];
  title: Scalars['String'];
  start: Scalars['ISODate'];
  end: Scalars['ISODate'];
};

export type CreateCalendarEventInput = {
  title: Scalars['String'];
  start: Scalars['ISODate'];
  end: Scalars['ISODate'];
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
  deleteCalendarEvents?: Maybe<Scalars['Boolean']>;
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
  users: Array<User>;
  viewer?: Maybe<User>;
  calendarEvents: Array<CalendarEvent>;
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
  createdAt: Scalars['ISODate'];
};

export type CreateCalendarEventMutationVariables = Exact<{
  title: Scalars['String'];
  start: Scalars['ISODate'];
  end: Scalars['ISODate'];
}>;


export type CreateCalendarEventMutation = (
  { __typename?: 'Mutation' }
  & { createCalendarEvent: (
    { __typename?: 'CreateCalendarEventPayload' }
    & { calendarEvent?: Maybe<(
      { __typename?: 'CalendarEvent' }
      & Pick<CalendarEvent, 'id' | 'title' | 'start' | 'end'>
    )> }
  ) }
);

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'SignInPayload' }
    & Pick<SignInPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  ) }
);

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'SignUpPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  ) }
);

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = (
  { __typename?: 'Query' }
  & { viewer?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type CalendarEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type CalendarEventsQuery = (
  { __typename?: 'Query' }
  & { calendarEvents: Array<(
    { __typename?: 'CalendarEvent' }
    & Pick<CalendarEvent, 'id' | 'title' | 'start' | 'end'>
  )> }
);


export const CreateCalendarEventDocument = gql`
    mutation CreateCalendarEvent($title: String!, $start: ISODate!, $end: ISODate!) {
  createCalendarEvent(input: {title: $title, start: $start, end: $end}) {
    calendarEvent {
      id
      title
      start
      end
    }
  }
}
    `;
export type CreateCalendarEventMutationFn = ApolloReactCommon.MutationFunction<CreateCalendarEventMutation, CreateCalendarEventMutationVariables>;

/**
 * __useCreateCalendarEventMutation__
 *
 * To run a mutation, you first call `useCreateCalendarEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCalendarEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCalendarEventMutation, { data, loading, error }] = useCreateCalendarEventMutation({
 *   variables: {
 *      title: // value for 'title'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useCreateCalendarEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCalendarEventMutation, CreateCalendarEventMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCalendarEventMutation, CreateCalendarEventMutationVariables>(CreateCalendarEventDocument, baseOptions);
      }
export type CreateCalendarEventMutationHookResult = ReturnType<typeof useCreateCalendarEventMutation>;
export type CreateCalendarEventMutationResult = ApolloReactCommon.MutationResult<CreateCalendarEventMutation>;
export type CreateCalendarEventMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCalendarEventMutation, CreateCalendarEventMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(input: {email: $email, password: $password}) {
    user {
      id
      email
    }
    token
  }
}
    `;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($email: String!, $password: String!) {
  signUp(input: {email: $email, password: $password}) {
    user {
      id
      email
    }
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const ViewerDocument = gql`
    query Viewer {
  viewer {
    id
    email
  }
}
    `;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
        return ApolloReactHooks.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, baseOptions);
      }
export function useViewerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, baseOptions);
        }
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = ApolloReactCommon.QueryResult<ViewerQuery, ViewerQueryVariables>;
export const CalendarEventsDocument = gql`
    query CalendarEvents {
  calendarEvents {
    id
    title
    start
    end
  }
}
    `;

/**
 * __useCalendarEventsQuery__
 *
 * To run a query within a React component, call `useCalendarEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalendarEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalendarEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCalendarEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CalendarEventsQuery, CalendarEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<CalendarEventsQuery, CalendarEventsQueryVariables>(CalendarEventsDocument, baseOptions);
      }
export function useCalendarEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CalendarEventsQuery, CalendarEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CalendarEventsQuery, CalendarEventsQueryVariables>(CalendarEventsDocument, baseOptions);
        }
export type CalendarEventsQueryHookResult = ReturnType<typeof useCalendarEventsQuery>;
export type CalendarEventsLazyQueryHookResult = ReturnType<typeof useCalendarEventsLazyQuery>;
export type CalendarEventsQueryResult = ApolloReactCommon.QueryResult<CalendarEventsQuery, CalendarEventsQueryVariables>;