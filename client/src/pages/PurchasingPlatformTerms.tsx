import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function PurchasingPlatformTerms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Terms of Membership | Purchasing Platform"
        description="Purchasing Platform Terms of Membership for contractors using our equipment purchasing services."
        keywords="purchasing platform terms, membership terms, contractor purchasing"
        canonicalUrl="https://servicetitanhacks.com/purchasing-platform-terms"
      />
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: 'Oxygen, sans-serif' }} data-testid="text-terms-title">
            Purchasing Platform Terms of Membership
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground">
            <p>
              Thank you for selecting Purchasing Platform for your purchasing and operational expense management needs. Purchasing Platform strives to provide a centralized marketplace for all your company's operational needs. We are confident you will find our Services will help your business lower both its operating and capital costs while improving overall efficiency.
            </p>
            <p>
              As a Member of our Services, you will enjoy the many benefits and efficiencies provided by our Services, including access to a variety of products and services such as office and express shipping. Before we begin, we want to lay out your Terms of Membership. We would like you to review these terms, and the Terms and Conditions for use of our Website, which will be used as part of our Services. After your review, if you wish to become a Member of our Services by establishing a Member Account, and agree to these terms, please indicate that you agree in the manner directed by the process on our website and complete the Member registration process. It's that simple.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Products and Services</h2>
              <p>
                Purchasing Platform makes available a wide array of Vendor Products and Vendor Services which may be purchased by you from time to time for use at your Properties. We have established relationships with Product and Service Vendors for your benefit as a Member of our Services. Specific Products may include, for example, office supplies, technology items, maintenance, repair and operation supplies, paint, etc. From time to time, we may also provide opportunities for you and our other Members to gain discounted access to various Service Vendors which Services may include, for example, overnight shipping, waste hauling consulting, video and internet services, vending machines, etc. Products can be purchased directly through the Purchasing Platform Website (www.purchasingplatform.com) and will be delivered directly by the Product Vendors. Purchasing Platform takes financial ownership of the products as the merchant of record. Likewise, Services may be procured through the Website. You will pay for the purchase of the Vendor Products, Vendor Services, and the performance or procurement of our Services as provided in the Fee Schedule found on our Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Returns and Order Cancellations</h2>
              <p>
                Purchasing Platform is an online marketplace that facilitates the ordering of products from multiple vendors on a single platform and within a single order. Many of our vendors are warehouse suppliers or warehousing branches of large retailers and their return policies are not the same as standard retail return policies. We are mediators on our members' behalf when order issues arise but we also must follow the return policies of our vendors.
              </p>
              <p>
                Please note that the return process is incumbent upon quickly reviewing items that arrive and informing Purchasing Platform of issues.
              </p>
              <p>
                Orders should be reviewed upon receipt and Purchasing Platform must be notified of shipping issues (eg. damaged upon receipt) within 3 business days. If you request a return for items received outside of the 3 business day window, they may not be eligible for return. We will advocate on your behalf but returns are subject to our vendors' policies and discretion.
              </p>
              <p>
                Returned products must be in the condition you received them and in the original box and/or packaging.
              </p>
              <p>
                Special order items requested through the Buying Desk or Strategic Project Management Team are only eligible for return under special circumstances: damaged in shipment, defective, or the vendor has shipped the incorrect item.
              </p>
              <p>
                Please contact Purchasing Platform to initiate any return process for orders placed on the platform. If the standard operating procedure of placing the order via Purchasing Platform is circumvented, we are not able to process the return on your behalf.
              </p>
              <p>
                No matter the reason for a return, we will need to set up a Return Authorization prior to you shipping the order back to the vendor. Please email support@purchasingplatform.com or call us at 312-583-7500 and we will assist you. You can also request your return directly from the product on your Purchasing Platform order dashboard.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Buyer's Remorse</h3>
              <p>
                Any return requested that is not the result of vendor or shipper error is considered a Buyer's Remorse return. Buyer's Remorse returns happen because of, but are not limited to, the following reasons:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ordered larger quantity than was needed</li>
                <li>Ordered incorrect item</li>
                <li>No longer need ordered item</li>
                <li>Unneeded item was on an order and approved by supervisor</li>
              </ul>
              <p>
                These return requests should be initiated within 2 weeks of receiving the item and return approval is at the sole discretion of the vendor. These returns are subject to a 20% restocking fee. If the vendor accepts the return request, any applicable return shipping charges must be paid for by the property/company initiating the return. Additionally, if the items are delivered by a retail store that uses a 3rd party delivery service/shipper, you may be asked to return the items in person to the nearest store location.
              </p>
              <p className="font-medium text-foreground">
                NOTE: Items procured through Buying Desk or the Strategic Project Management via special request are not eligible for Buyer's Remorse returns.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Damaged Items</h3>
              <p>When an item arrives damaged, there are two options available to you.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>If the item arrives obviously damaged, you can refuse the delivery. Tell the delivery driver you are refusing the delivery and they should be able to handle the return of that.</li>
                <li>You can accept the item and arrange a return.</li>
              </ul>
              <p>
                Damaged items should be reported to Purchasing Platform customer support within 3 business days of receiving the damaged items. We recommend reporting this damage with photos of the damage as many vendors request this information. Damaged items are eligible for a return and reshipment within that window. In the event you are reporting damaged items outside of 3 business days, it is at the vendor's discretion and may not be eligible for return. We will reach out on your behalf to request the return.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Incorrect Item Received</h3>
              <p>
                If the vendor mispicked and shipped an incorrect item, this should be reported to Purchasing Platform customer support with photos within 3 business days of receiving the incorrect item. Mispicked items are eligible for a return and reshipment. In the event you are reporting mispicked items outside of 3 business days, it is at the vendor's discretion and may not be eligible for return. We will reach out on your behalf to request the return.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Order and Item Cancellation Requests</h3>
              <p>
                Purchasing Platform has integration with some of our largest vendors which makes canceling an item or an order that is in the processing status very difficult. These vendors process the shipments immediately so they leave the warehouse the same day or first thing the next day. If you need a cancellation, please reach out to our support team with your request via email or phone. We will let you know if we are able to stop the order or if you will need to refuse the items when they arrive. In most cases, you will need to refuse the shipments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Properties/Locations</h2>
              <p>
                Many of our Members are responsible for numerous Properties in various parts of the country. We may refer to these Properties as Locations. Members may also have corporate and regional offices in various parts of the country, which we may also refer to as Locations. To avoid any confusion, all of your Locations will be subject to these Terms of Membership.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Term</h2>
              <p>
                Your Membership is month-to-month. You may request cancellation of your Membership at any time and will expire at the end of the then current billing cycle, so long as your cancellation request is received by us before the last full business day of that billing cycle. You will still be responsible for payment of any Fees still owed. And although we do not anticipate doing so, please keep in mind that in the unlikely event we may have to terminate your Membership, we will give you three (3) business days' notice.
              </p>
              <p>
                You can add Locations to your Member Account at any time and you will be charged the appropriate Fees for these additions. You can also remove Locations from your Member Account. If your Membership or any part of it is cancelled or terminated, you will pay any Fees on any Products or Services ordered by the affected Locations before such cancellation or termination.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">5. Fees</h2>
              <p>
                There are three Fee components: (1) A Monthly Fee, paid monthly, based on the prior month's spend activity; (2) an Administrative Fee due and payable on each purchase of a Product/Service; and (3) a credit card Processing Fee when credit cards are used by Member for the purchase of a Product/Service (if available).
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-medium text-foreground">Monthly Fee:</span> The Monthly Fee for your Membership is provided in the Fee Schedule available on our Website and is billed on a monthly basis on or about the day that you established your Membership, for the previous month's spend activity. The cost of Products and Services are also provided on our Website. Please be sure to review this information on our Website.
                </li>
                <li>
                  <span className="font-medium text-foreground">Administrative Fee:</span> You pay an Administrative Fee on each Product purchased by you under the Agreement. The amount of the Administrative Fee will vary based upon the specific Product and may change from time to time, but will always be visible on the Website and included in the final product pricing prior to any purchase by you.
                </li>
                <li>
                  <span className="font-medium text-foreground">Processing Fee:</span> In the event you elect to charge any Fee or cost of a Product or a Service to one of your credit cards, a fee in the amount of three percent (3.0%) of the aggregate cost or sale price (including applicable taxes and shipping costs and the like) will be added to the order at the time of checkout. We will endeavor to provide you with advance notice as to any changes to any Processing Fee. Unfortunately, we may from time to time also have to pass along fee increases in the event that we are charged increases by merchants for their processing-related services fees.
                </li>
              </ul>
              <p>
                For any Locations added to or removed from your Member Account in any given month, your bill will be adjusted accordingly during the next billing cycle.
              </p>
              <p>
                Because of the nature of our billing structure, please keep in mind that if you cancel or terminate within a given month, we do not prorate and refund the Fees for that month.
              </p>
              <p>
                Also, please keep in mind that, from time to time, we may increase these Fees and if we do, we will notify you beforehand, so you will have time to consider the increase.
              </p>
              <p>
                You are responsible for payment for the Cost of all Products and Services together with applicable sales and use taxes and any other charges imposed by federal, state or local laws related to the sale and delivery of the Products and Services, such costs to be identified on the applicable invoice. You will pay for the Cost of Products and Services immediately upon placing your order. Any missed payment may cause the order to be rejected and the Products or Services not delivered.
              </p>
              <p>
                We will remit the Cost of Products and Services and any associated sales tax or other sales or delivery charges to the applicable Product Vendors or Service Vendors on or before the applicable due date.
              </p>
              <p>
                Fees or the Cost of Products and Services are paid by one of the methods provided in the Fee Schedule on our Website.
              </p>
              <p>
                If any Fees or the Cost of Products and Services are not paid when due, then such unpaid amounts will bear interest at a rate equal to 1-1/2% per month (18% annually) or if less, such lower rate as may be allowed by applicable law, from the date due until paid.
              </p>
              <p>
                We are not responsible for unauthorized use of your credit/debit card or credit/debit card information by your employees or any third party if they obtained the information through you (e.g., vendor, consultant, contractor, etc.).
              </p>
              <p>
                We agree at all times to remain in strict compliance with all terms, provisions, regulations and rulings relative to the then most current provisions and requirements of the Payment Card Industry Data Security Standards, as developed and promulgated by the PCI Security Standards Council, as well as with all state and federal requirements relative to credit card and electronic fund transfer payments, to the extent applicable to us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">6. Manufacturer Warranties</h2>
              <p>
                As with most purchases of products or services, there may be manufacturer or service warranties available. Purchasing Platform will assign or otherwise make available to you all of Purchasing Platform's rights, to the extent there are any, under the manufacturer's warranty on each Product or Service, so long as they are assignable. If not assignable, we will take all reasonable actions upon your request to provide you the benefit of such warranties. If your representative accepts delivery of a Product, the acceptance will be your acknowledgement that the Product is the product ordered and authorized for purchase by you.
              </p>
              <p>
                The nature of our business requires us to make certain disclaimers. We're sure you understand.
              </p>
              <p className="uppercase text-sm font-medium text-foreground">
                YOU ACKNOWLEDGE AND AGREE THAT: (A) PURCHASING PLATFORM IS NOT A PRODUCER, MANUFACTURER, DESIGNER OR DISTRIBUTOR OF ANY OF THE PRODUCTS OR SERVICES, AND (B) PURCHASING PLATFORM HAS MADE NO, DOES NOT MAKE ANY, AND DISCLAIMS ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESSED OR IMPLIED, WITH RESPECT TO ANY PRODUCT OR SERVICE AND PURCHASING PLATFORM WILL NOT BE LIABLE FOR ANY SUCH REPRESENTATIONS OR WARRANTIES INCLUDING, WITHOUT LIMITATION, WARRANTIES AS TO MERCHANTABILITY, DESIGN, QUALITY, FITNESS FOR A PARTICULAR PURPOSE OR CAPACITY, OR NONINFRINGEMENT.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">7. Your Obligations and Purchasing Platform's Obligations</h2>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">a. Your Obligations:</h3>
              <ol className="list-roman pl-6 space-y-3" style={{ listStyleType: 'lower-roman' }}>
                <li>You agree that you will purchase the Products or Services through your Membership solely for your own use in connection with the Locations (and your home office and your employees for their personal use) and for no other properties, and not for resale. You will not authorize nor permit anyone else to purchase the Products or Services through your Membership.</li>
                <li>You will comply with all relevant export laws and regulations and will not export or re-export (as defined under applicable laws) any Products or related components or information, unless you have first obtained all required export licenses and other government approvals.</li>
                <li>You will pay Fees as described in the Fee Schedule on our Website. In the unlikely event you miss any payment due, you will have an opportunity to pay within five (5) business days after the due date. If you breach any term of your Membership, we may terminate your Membership. You will still be responsible for any unpaid Fees, including Fees for all Products not returned.</li>
                <li>You agree to abide by the Terms and Conditions of our Website, which can be found at Terms of Use, in addition to these Terms of Membership.</li>
              </ol>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">b. Our Obligations:</h3>
              <ol className="list-roman pl-6 space-y-3" style={{ listStyleType: 'lower-roman' }}>
                <li>For our efforts in delivering procurement services, we may receive compensation (e.g., shared savings, rebates, etc.) directly from certain of the Product or Service Vendors. We agree that the procurement model will be transparent and we will disclose to you any fees with the Product or Service pricing that are not considered nominal.</li>
                <li>During the Term, we will: (A) seek the lowest possible price for Products or Services, (B) inform Product Vendors or Service Vendors that we are purchasing for you, (C) unless otherwise noted, not act as the supplier or vendor of any Products purchased by you, and (D) act only upon the written instructions from you (which may be via electronic mail) in the event we purchase any Products on your behalf or provide Services to you, and (E) upon request, use our best efforts to seek the best settlement for you of claims against manufacturers/distributors of the purchased Products.</li>
                <li>If we breach these Terms of Membership, and do not correct it within fifteen (15) days of notice from you, you may terminate your Membership.</li>
                <li>We will provide you with access to management reports and consolidated electronic reporting in a standardized data format designed by us, which may be modified from time to time.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">8. Disclaimers</h2>
              <p>
                The nature of our business requires us to make certain disclaimers. We're sure you understand.
              </p>
              <p className="uppercase text-sm font-medium text-foreground">
                IN NO EVENT WILL PURCHASING PLATFORM OR ITS SUPPLIERS BE LIABLE TO MEMBER FOR ANY LOST PROFITS, REVENUES OR SAVINGS, LOST DATA OR FOR ANY SPECIAL, INCIDENTAL, INDIRECT, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, THE PRODUCTS OR THE USE OF THE WEBSITE OR ANY OTHER MATERIALS PROVIDED HEREUNDER (WHETHER FROM BREACH OF CONTRACT OR WARRANTY, FROM NEGLIGENCE, STRICT LIABILITY OR OTHER CAUSE OF ACTION), EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. FURTHERMORE, IN NO EVENT WILL PURCHASING PLATFORM'S AGGREGATE LIABILITY RELATED TO THIS AGREEMENT EXCEED THE FEES ACTUALLY PAID OR PAYABLE BY MEMBER HEREUNDER. THE FOREGOING LIMITATION IS CUMULATIVE WITH ALL PAYMENTS BEING AGGREGATED TO DETERMINE SATISFACTION OF THE LIMIT. THE EXISTENCE OF ONE OR MORE CLAIMS WILL NOT ENLARGE SUCH LIMIT. MEMBER AGREES NOT TO LOOK TO PURCHASING PLATFORM FOR ANY REMEDIES OR TO HOLD PURCHASING PLATFORM RESPONSIBLE FOR ANY FAULTS OR DEFECTS IN ANY OF THE PRODUCTS OR IN THE DESIGN OF ANY OF THE PRODUCTS, IT BEING UNDERSTOOD AND AGREED THAT PURCHASING PLATFORM IS NOT RESPONSIBLE FOR ANY DEFECTS OR DAMAGES TO THE PRODUCTS, ANY DELAYS IN DELIVERY OR ANY OTHER ACT OR OMISSION OF A SUPPLIER OR MANUFACTURER.
              </p>
              <p className="uppercase text-sm font-medium text-foreground mt-4">
                FOR ANY AND ALL VENDOR SERVICES PERFORMED PURSUANT TO THIS AGREEMENT, IN NO EVENT WILL WE, PURCHASING PLATFORM, BE LIABLE FOR CONSEQUENTIAL, INCIDENTAL, SPECIAL OR INDIRECT DAMAGES, OR ANY KIND OR TYPE OF LOST BUSINESS, ACTUAL OR PERCEIVED LOST PROFITS, LOST DATA OR INFORMATION ACTUAL OR PERCEIVED LOST REVENUES, OR ANY LOST SAVINGS, REGARDLESS OF ANY FAULT, AND REGARDLESS AS TO WHETHER CONSERVICE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND WHETHER OR NOT SUCH DAMAGES WERE FORSEEABLE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">9. Miscellaneous</h2>
              <ol className="list-alpha pl-6 space-y-3" style={{ listStyleType: 'lower-alpha' }}>
                <li>We may modify these Terms of Membership from time to time, and if we do, we will give you sufficient notice for you to be able to accept or decline the changes. If you decline the changes, we will terminate your Membership.</li>
                <li>Any notice to you relating to your Membership, unless otherwise designated, will be through your Member Account via the Website, or via email to the appropriate person(s) identified in the Member Account. Any notice to us relating to your Membership, unless otherwise designated, will be through your Member Account via the Website, or via email to support@purchasingplatform.com.</li>
                <li>These Terms of Membership and each of its provisions are binding on the heirs, executors, administrators, legal representatives, successors, and assigns of each of the parties. Notwithstanding the foregoing, in the event of a sale of a Location by you or your affiliate, these Terms of Membership will terminate relative to that Location and the purchaser may enter into a new agreement with us.</li>
                <li>Our relationship is that of independent contractors, and nothing in these Terms of Membership is to be deemed or construed as evidencing a partnership, joint venture, employer/employee, or other relationship. Each party is an independent contractor acting for its own accounts, and except as otherwise expressly provided in these Terms of Membership or expressly authorized to do so by the other in writing, neither is authorized to make any commitment or representation, express or implied, on the other's behalf. Neither party will have any right, power or authority to enter into any agreement for, or on behalf of, or incur any obligation or liability of, or to otherwise bind, the other party.</li>
                <li>You acknowledge that we are not acting on behalf of you as an agent.</li>
                <li>Any dispute between you and any third party arising out of or related to any Product or Service is solely between you and such third party. Whenever necessary and proper, we will inform third parties and governmental agencies of our status as an independent contractor. We will have no power and will not represent that we have any power to bind you as your agent or in any other capacity.</li>
                <li>These Terms of Membership and the parties' actions under these Terms of Membership will be governed by and construed under the laws of the state of Illinois, without reference to conflict of law principles. The parties hereby expressly consent to the jurisdiction and venue of the federal and state courts within the County of Cook, State of Illinois.</li>
                <li>All representations, warranties and indemnification obligations contained in these Terms of Membership survive the expiration or termination of Membership.</li>
              </ol>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
