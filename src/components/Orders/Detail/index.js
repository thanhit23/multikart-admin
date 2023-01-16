import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FormattedMessage } from 'react-intl';
import cls from 'classnames';
import Breadcrumb from '../../Breadcrumb';
import messages from './messages';
import { formatMoney } from '../../../helpers';
import TextareaWithFormatMessage from '../../TextareaWithFormatMessage';
import LabelWithFormatMessage from '../../LabelWithFormatMessage';
import visa from '../../../resources/images/visa.png';
import masterCard from '../../../resources/images/38fd98e55806c3b2e4535c4e4a6c4c08.png';
import JapanCreditBureau from '../../../resources/images/a0a9062ebe19b45c1ae0506f16af5c16.png';

function OrderDetailComponent({ order, productOrder, deleteProductOrder }) {
  const statusOrder = ['Cancelled', 'Pending', 'Processing', 'Delivered'];

  const renderClsTextarea = () => {
    return [
      'hover:border-[#111] w-full outline-none appearance-none border border-[#e3e9ef] rounded p-3 text-[14px] leading-tight mt-3',
    ];
  };

  const imgCreditDebit = [visa, masterCard, JapanCreditBureau];

  const { status, id, customerNote, address, amount } = order;

  const renderProduct = () =>
    productOrder.map(
      ({ _id, product: { thumbnail, name }, price, quantity }, i) => {
        return (
          <div key={i} className="flex flex-row gap-4 my-6">
            <div className="flex flex-row gap-4 w-1/2">
              <div className="max-h-[64px] max-w-[64px]">
                <img
                  className="object-cover h-full w-full rounded"
                  src={thumbnail}
                  alt=""
                />
              </div>
              <div>
                <h6 className="text-sm mb-1">{name}</h6>
                <div className="flex place-items-center">
                  <p className="whitespace-nowrap text-[#7d879c] text-sm">
                    {price} VND x
                  </p>
                  <div className="max-w-[60px] ml-2">
                    <div className="min-w-0 ">
                      <input
                        className="hover:border-[#111] h-8 w-full outline-none appearance-none border border-[#e3e9ef] rounded p-2 text-[14px] leading-tight"
                        type="number"
                        defaultValue={quantity}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 w-1/2 place-items-center justify-between">
              <p className="text-[#7d879c] text-sm">
                Product properties: Black, L
              </p>
              <button
                type="button"
                className="p-4"
                onClick={() => deleteProductOrder(_id)}
              >
                <FontAwesomeIcon className="text-[#7D879C]" icon={faTrash} />
              </button>
            </div>
          </div>
        );
      },
    );

  const renderShippingFee = () => {
    let result = 0;
    productOrder.map(({ shipingFee }) => (result += shipingFee));
    return result;
  };

  const renderDiscountPercent = () => {
    let result = 0;
    productOrder.map(
      ({ discountPercent, price }) =>
        (result += (price * discountPercent) / 100),
    );
    return result;
  };
  console.log(status);

  return (
    <>
      <Breadcrumb title="order_detail" />
      <div className="shadow-[#03004717_0px_1px_3px] bg-white rounded mt-4 rounded-lg">
        <div className="p-6">
          <div className="flex flex-row gap-8">
            <p className="m-0 text-sm">
              <span className="text-[#7d879c] normal-case whitespace-normal mr-1">
                <FormattedMessage {...messages.order_id} />:
              </span>
              {id}
            </p>
            <p className="m-0 text-sm">
              <span className="text-[#7d879c] normal-case whitespace-normal mr-1">
                <FormattedMessage {...messages.placed_on} />:
              </span>
              10 Nov, 2022
            </p>
          </div>
          <div className="flex flex-col my-6">
            <label className="mb-2">
              <FormattedMessage {...messages.order_status} />
            </label>
            <div className="relative w-1/2">
              <select className="hover:border-[#111] h-12 w-full outline-none appearance-none border border-[#e3e9ef] rounded p-3 text-[14px] leading-tight">
                {statusOrder.map((e, i) => (
                  <option key={i} value={i} selected={i === status}>
                    {e}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                className="absolute text-[#7D879C] right-3 top-[50%] translate-y-[-50%]"
                icon={faChevronDown}
              />
            </div>
          </div>
          {productOrder.length && renderProduct()}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1 shadow-[#03004717_0px_1px_3px] bg-white rounded mt-4 rounded-lg mt-6">
          <div className="p-6">
            <div>
              <LabelWithFormatMessage
                message={messages.label.shipping_address}
                className="mb-2"
                htmlFor="shipping-address"
              />
              <div className={cls(renderClsTextarea())}>
                <TextareaWithFormatMessage
                  className="w-full outline-none appearance-none border-none text-[14px] leading-tight"
                  id="shipping-address"
                  type="text"
                  name="shipping-address"
                  rows={4}
                  message={messages.placeholder.shipping_address}
                  value={address}
                />
              </div>
            </div>
            <div className="mt-3">
              <LabelWithFormatMessage
                message={messages.label.customer_note}
                className="mb-2"
                htmlFor="customer-note"
              />
              <div className={cls(renderClsTextarea())}>
                <TextareaWithFormatMessage
                  className="w-full outline-none appearance-none border-none text-[14px] leading-tight"
                  id="customer-note"
                  type="text"
                  name="customer-note"
                  rows={4}
                  message={messages.placeholder.customer_note}
                  value={customerNote}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 shadow-[#03004717_0px_1px_3px] bg-white rounded mt-4 rounded-lg mt-6">
          <div className="p-6">
            <h6 className="text-base mb-3">
              <FormattedMessage {...messages.total_summary} />
            </h6>
            <div className="flex justify-between mb-3">
              <p className="text-[#7d879c] text-sm">
                <FormattedMessage {...messages.subtotal} />:
              </p>
              <h6 className="text-sm">{formatMoney(amount)} VNĐ</h6>
            </div>
            <div className="flex justify-between mb-3">
              <p className="text-[#7d879c] text-sm">
                <FormattedMessage {...messages.shipping_fee} />:
              </p>
              <div className="flex place-items-center">
                <h6 className="text-sm mr-1">VNĐ</h6>
                <div className="max-w-[60px] ml-2">
                  <h6 className="text-sm">
                    {productOrder.length && formatMoney(renderShippingFee())}
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <p className="text-[#7d879c] text-sm">
                <FormattedMessage {...messages.discount} />
                (%):
              </p>
              <div className="flex place-items-center">
                <h6 className="text-sm mr-1">VNĐ</h6>
                <div className="max-w-[60px] ml-2">
                  <h6 className="text-sm">
                    {productOrder.length &&
                      formatMoney(renderDiscountPercent())}
                  </h6>
                </div>
              </div>
            </div>
            <hr className="my-4 border-[#f3f5f9]" />
            <div className="flex justify-between mb-3">
              <p className="text-[#2b3445] text-sm font-semibold">
                <FormattedMessage {...messages.total} />
              </p>
              <div className="flex">
                <div className="max-w-[60px] mr-2">
                  <h6 className="text-sm">
                    {productOrder.length &&
                      formatMoney(
                        renderShippingFee() + amount - renderDiscountPercent(),
                      )}
                  </h6>
                </div>
                <h6 className="text-sm">VNĐ</h6>
              </div>
            </div>
            <h6 className="text-sm mb-3 text-[#2b3445] font-light">
              <FormattedMessage {...messages.paid_method} />
            </h6>
            <div className="flex flex-row">
              {imgCreditDebit.map((e, i) => (
                <div
                  key={i}
                  className="shadow-[#03004717_0px_1px_3px] bg-white rounded p-1 mr-2"
                >
                  <img src={e} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          className="bg-[#007bff] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          <FormattedMessage {...messages.button.submit} />
        </button>
      </div>
    </>
  );
}

export default OrderDetailComponent;
