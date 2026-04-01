import { ArrowLeft, Copy, Share2, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

const SAMPLE_TREE = [
  {
    id: "you",
    name: "You",
    code: "AUG-YOU001",
    level: 0,
    income: 2500,
    children: [
      {
        id: "d1",
        name: "Priya Sharma",
        code: "AUG-PS001",
        level: 1,
        income: 500,
        children: [
          {
            id: "d1a",
            name: "Sunita Devi",
            code: "AUG-SD003",
            level: 2,
            income: 100,
            children: [],
          },
          {
            id: "d1b",
            name: "Meena Rani",
            code: "AUG-MR004",
            level: 2,
            income: 100,
            children: [],
          },
        ],
      },
      {
        id: "d2",
        name: "Rahul Kumar",
        code: "AUG-RK002",
        level: 1,
        income: 500,
        children: [
          {
            id: "d2a",
            name: "Amit Singh",
            code: "AUG-AS004",
            level: 2,
            income: 100,
            children: [],
          },
        ],
      },
      {
        id: "d3",
        name: "Kavita Joshi",
        code: "AUG-KJ005",
        level: 1,
        income: 500,
        children: [],
      },
    ],
  },
];

interface TreeNode {
  id: string;
  name: string;
  code: string;
  level: number;
  income: number;
  children: TreeNode[];
}

function TreeNodeCard({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const colors = [
    "bg-brand-green",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
  ];
  const bg = colors[depth % colors.length];

  return (
    <div className={`ml-${depth * 4}`}>
      <div
        className={`${bg} text-white rounded-xl p-2.5 mb-1 flex items-center gap-2`}
      >
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
          {node.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold line-clamp-1">{node.name}</p>
          <p className="text-[10px] text-white/70">{node.code}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold">₹{node.income}</p>
          <p className="text-[10px] text-white/70">L{node.level}</p>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className="ml-4 border-l-2 border-brand-green/30 pl-3 space-y-1">
          {node.children.map((child) => (
            <TreeNodeCard key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NetworkDashboard() {
  const { navigate } = useNav();
  const user = useStore((s) => s.user);
  const referralCode = user?.referralCode ?? "AUG-DEMO001";
  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied!");
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join AUG Network",
        text: "Join my team and earn money!",
        url: referralLink,
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      toast.success("Link copied!");
    }
  };

  const stats = [
    {
      label: "Direct Income",
      value: "₹1,500",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Level Income",
      value: "₹800",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Team Size",
      value: "6",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "This Month",
      value: "₹2,300",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="fade-in-up" data-ocid="network.page">
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-white"
          data-ocid="network.button"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg">Network Dashboard</h1>
      </div>

      <div className="px-3 py-4 space-y-4">
        {/* Referral Card */}
        <div className="bg-brand-green text-white rounded-2xl p-4">
          <p className="text-xs text-white/70 mb-1">Your Referral Code</p>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2 mb-3">
            <span className="font-bold text-lg flex-1 tracking-widest">
              {referralCode}
            </span>
            <button
              type="button"
              onClick={copyCode}
              className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition"
              data-ocid="network.button"
            >
              <Copy size={16} />
            </button>
          </div>
          <button
            type="button"
            onClick={shareLink}
            className="w-full bg-brand-yellow text-black font-bold text-sm py-2.5 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition"
            data-ocid="network.primary_button"
          >
            <Share2 size={16} /> Share & Earn ₹500
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} dark:bg-card rounded-xl p-3`}
            >
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Commission Levels */}
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-green" /> Commission
            Structure
          </h3>
          <div className="space-y-2">
            {[
              { level: 1, rate: "10%", desc: "Direct referrals" },
              { level: 2, rate: "5%", desc: "2nd level team" },
              { level: 3, rate: "3%", desc: "3rd level team" },
              { level: 4, rate: "2%", desc: "4th level team" },
              { level: 5, rate: "1%", desc: "5th level team" },
            ].map((l) => (
              <div key={l.level} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center">
                  L{l.level}
                </div>
                <span className="flex-1 text-xs text-muted-foreground">
                  {l.desc}
                </span>
                <span className="font-bold text-brand-green text-sm">
                  {l.rate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Network Tree */}
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Users size={16} className="text-brand-green" /> My Network
          </h3>
          <div className="space-y-1 overflow-x-auto">
            {SAMPLE_TREE.map((node) => (
              <TreeNodeCard key={node.id} node={node} depth={0} />
            ))}
          </div>
        </div>

        {/* Income History */}
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <h3 className="font-bold text-sm mb-3">Income History</h3>
          <div className="space-y-2">
            {[
              {
                date: "Dec 28",
                desc: "Level income - Priya's team",
                amount: 300,
                type: "credit",
              },
              {
                date: "Dec 25",
                desc: "Direct income - Rahul Kumar",
                amount: 500,
                type: "credit",
              },
              {
                date: "Dec 20",
                desc: "Direct income - Kavita Joshi",
                amount: 500,
                type: "credit",
              },
              {
                date: "Dec 15",
                desc: "Level income - Amit Singh",
                amount: 150,
                type: "credit",
              },
            ].map((item) => (
              <div key={item.date} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp size={14} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">{item.desc}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.date}
                  </p>
                </div>
                <span className="text-sm font-bold text-green-600">
                  +₹{item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
