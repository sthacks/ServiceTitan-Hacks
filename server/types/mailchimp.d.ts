declare module '@mailchimp/mailchimp_marketing' {
  interface Config {
    apiKey: string;
    server: string;
  }

  interface MailchimpClient {
    setConfig(config: Config): void;
    lists: {
      setListMember(
        listId: string,
        subscriberHash: string,
        body: {
          email_address: string;
          status_if_new: 'subscribed' | 'pending' | 'unsubscribed' | 'cleaned';
          merge_fields?: Record<string, string>;
        }
      ): Promise<{
        id: string;
        email_address: string;
        status: string;
        last_changed: string;
      }>;
      updateListMemberTags(
        listId: string,
        subscriberHash: string,
        body: {
          tags: Array<{ name: string; status: 'active' | 'inactive' }>;
        }
      ): Promise<void>;
    };
  }

  const mailchimp: MailchimpClient;
  export default mailchimp;
}
