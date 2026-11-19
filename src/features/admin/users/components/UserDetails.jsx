import CustomerProfile from "@/pages/admin/users/userDetails/CustomerProfile";
import SavedAddresses from "@/pages/admin/users/userDetails/SavedAddress";
import CustomerOrders from "@/pages/admin/users/userDetails/CustomerOrder";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
} from "@/pages/admin/users/userDetails/Icon";
import { getCustDetail } from "@/features/admin/users/services/adminUserService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// ---------------------------------------------------------------
// Data contoh. Ganti dengan data dari API (Axios) lalu kirim lewat props.
// ---------------------------------------------------------------
const MOCK_CUSTOMER = {
  username: "adel",
  email: "adel@example.com",
  phone: "+62 812-3456-7890",
  registeredAt: "10/01/2026, 09:15:00 AM",
  lastLogin: "10/13/2026, 1:20:10 PM",
  isActive: true,
};

const MOCK_ADDRESSES = [
  {
    id: 1,
    variant: "primary",
    label: "Main Address",
    tag: "Primary Shipping",
    address:
      "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190",
    recipient: "Adel",
    phone: "081234567890",
    locked: true,
  },
  {
    id: 2,
    variant: "secondary",
    label: "Office Address",
    tag: "Secondary Destination",
    address:
      "SCBD Treasury Tower Lt. 18, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190",
    detail: "Corporate Reception • Delivery Hours: 09:00 - 18:00 WIB",
    availableForCheckout: true,
  },
];

const MOCK_ORDERS = [
  {
    id: "f0d8d",
    username: "adel",
    orderTime: "10/13/2026, 1:27:55 PM",
    completedEstimate: "10/17/2026",
    totalPrice: 101.97,
    totalProduct: 2,
    status: "pending",
  },
  {
    id: "5ca52",
    username: "adel",
    orderTime: "10/9/2026, 9:20:02 AM",
    completedEstimate: "10/13/2026",
    totalPrice: 35,
    totalProduct: 1,
    status: "pending",
  },
  {
    id: "7be6c",
    username: "adel",
    orderTime: "10/7/2026, 2:26:40 PM",
    completedEstimate: "10/11/2026",
    totalPrice: 600,
    totalProduct: 3,
    status: "pending",
  },
];

const UserDetail = ({ userId, onClose }) => {
  const navigate = useNavigate();
  console.log(userId);
  const [isCust, setIsCust] = useState({});
  const [loading, setLoading] = useState(true);
  const id = userId;
  const fetchCust = async () => {
    try {
      setLoading(true);
      const res = await getCustDetail(id);
      setIsCust(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCust();
  }, [id]);

  if (loading) {
    return <p>Wait a minute...</p>;
  }

  console.log(isCust);
  const custDetail = isCust.data;
  console.log(custDetail);
  return (
    <main className="fixed z-100 inset-0 bg-black/40 p-8 flex justify-center">
      <div className="bg-white w-full max-w-4/5 max-h-[90vh] overflow-y-auto space-y-5 rounded-lg p-5">
        {/* Page header */}
        <header>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Customer Detail
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Account metadata, address book registries, and historical orders
                for customer ledger.
              </p>
            </div>

            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 pt-2 text-[11px] font-medium text-slate-600"
            >
              <span>Dashboard</span>
              <ChevronRightIcon className="h-3 w-3 text-slate-400" />
              <span>Customer</span>
              <ChevronRightIcon className="h-3 w-3 text-slate-400" />
              <span className="font-bold text-slate-900">
                {custDetail?.name}
              </span>
            </nav>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to Customers
          </button>
        </header>

        {/* Children */}
        <CustomerProfile customer={custDetail} />
        <SavedAddresses addresses={custDetail.address} />
        <CustomerOrders
          orders={custDetail?.transactions}
          total={custDetail?.totalOrders}
        />
      </div>
    </main>
  );
};
export default UserDetail;
