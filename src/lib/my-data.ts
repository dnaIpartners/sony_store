// 마이페이지 공용 더미 데이터. /my(통합)와 /my-personal(개인화 안)이 같이 쓴다.
// sony.co.kr 두 페이지는 로그인 뒤에만 보이므로 구성은 공개된 메뉴 이름을
// 근거로 잡았다.
import {
  IconDeposit,
  IconPaid,
  IconPacking,
  IconShipping,
  IconDelivered,
} from "@/src/components/OrderStepIcons";

export const USER = {
  name: "윤근식",
  grade: "GOLD",
  nextGrade: "VIP",
  nextGradeAmount: 480_000,
  joined: "2023.04.12",
  unified: true, // 소니 통합회원 전환 여부
};

export const SUMMARY = [
  { key: "mileage", label: "마일리지", value: "12,500", unit: "M", href: "/my-page#mileage-tit" },
  { key: "coupon", label: "쿠폰", value: "2", unit: "장", href: "/my-page#coupon-tit" },
  { key: "wish", label: "찜", value: "3", unit: "개", href: "#wish" },
  { key: "order", label: "진행 중 주문", value: "2", unit: "건", href: "#order" },
  { key: "product", label: "정품등록 제품", value: "2", unit: "대", href: "#warranty" },
  { key: "service", label: "진행 중 A/S", value: "1", unit: "건", href: "#pickup" },
  { key: "warranty", label: "보증 만료 임박", value: "1", unit: "대", href: "#warranty", alert: true },
];

// 와이어프레임 "My Sony에서 할 수 있는 일" 회원 메뉴 6개 = 탭 = 섹션
export const TABS = [
  { id: "order", label: "주문/배송 조회" },
  { id: "warranty", label: "정품등록/관리" },
  { id: "eps", label: "연장서비스 플랜 EPS" },
  { id: "pickup", label: "픽업서비스 신청/내역" },
  { id: "event", label: "이벤트관리" },
  { id: "wish", label: "내가 찜한 소니" },
];

// 입금대기 → 결제완료 → 배송준비 → 배송중 → 배송완료
export const ORDER_STEPS = [
  { label: "입금대기", count: 0, Icon: IconDeposit },
  { label: "결제완료", count: 1, Icon: IconPaid },
  { label: "배송준비", count: 0, Icon: IconPacking },
  { label: "배송중", count: 1, Icon: IconShipping },
  { label: "배송완료", count: 3, Icon: IconDelivered },
];

export const ORDERS = [
  { date: "2026.09.11", no: "20260911-0004821", model: "WH-1000XM6", name: "무선 노이즈캔슬링 헤드폰", price: 549_000, status: "배송중", on: true },
  { date: "2026.09.02", no: "20260902-0002114", model: "ILCE-7CM2L", name: "α7C II 렌즈 키트", price: 2_990_000, status: "결제완료", on: true },
];



// 사진이 있는 제품만 img 를 채운다. 없으면 모델명을 적은 회색 판
export const COUPONS = [
  {
    price: "5,000", unit: "원", name: "마케팅 수신 동의 5,000원 할인", until: "2026-09-21 23:59:59",
    info: "*발급대상 : 마케팅 수신 동의 고객\n*적용제품 : 3만원 이상의 소니스토어 전 제품 (단, My Sony Care 제외)\n*발급일로부터 7일간 자유롭게 사용 가능",
  },
  {
    price: "5", unit: "%", name: "회원가입 감사 5% 할인", until: "2026-09-28 23:59:59",
    info: "*발급대상 : 신규 회원 가입 고객\n*적용제품 : 3만원 이상의 소니스토어 전 제품 (단, My Sony Care 제외)\n*최대할인 : 100,000원\n*발급일로부터 14일간 자유롭게 사용 가능",
  },
];

export const WISH = [
  { model: "ILCE-7RM6", name: "α7R VI 풀프레임 미러리스", price: 4_990_000, img: "/asset/sony/ILCE-7RM6.png" },
  { model: "ILCE-7CM2L", name: "α7C II 렌즈 키트", price: 2_990_000, img: "/asset/sony/ILCE-7CM2L.png" },
  { model: "SEL70200GM2", name: "FE 70-200mm F2.8 GM OSS II", price: 3_690_000, img: "/asset/sony/102265974_1.png" },
];

// 정품등록 제품 (SCSWarranty + My Sony 나의 제품)
export const PRODUCTS = [
  { model: "ILCE-7RM6", name: "α7R VI 풀프레임 미러리스", img: "/asset/sony/ILCE-7RM6.png", serial: "S01-4A7C-****", bought: "2026.03.02", registered: "2026.03.05", warrantyEnd: "2027.03.01", care: "My Sony Care 3년", status: "보증중" },
  { model: "ILCE-7CM2L", name: "α7C II 렌즈 키트", img: "/asset/sony/ILCE-7CM2L.png", serial: "S02-8B1D-****", bought: "2026.09.02", registered: "-", warrantyEnd: "-", care: "-", status: "미등록" },
  { model: "WH-1000XM5", name: "무선 노이즈캔슬링 헤드폰", img: "", serial: "H11-3C9F-****", bought: "2024.10.14", registered: "2024.10.15", warrantyEnd: "2026.10.13", care: "-", status: "만료 임박" },
];

// A/S 접수 진행: 접수 → 입고 → 점검/수리 → 수리완료 → 출고/수령
export const SERVICE_STEPS = ["접수", "입고", "점검·수리", "수리완료", "출고·수령"];
export const SERVICES = [
  { no: "SC-2026-091102", model: "WH-1000XM5", symptom: "왼쪽 유닛 소리 끊김", date: "2026.09.11", how: "픽업 서비스", step: 2 },
  { no: "SC-2026-052014", model: "ILCE-7RM6", symptom: "센서 클리닝", date: "2026.05.20", how: "강남 서비스센터 방문", step: 4 },
];
export const PICKUPS = [
  { no: "PK-2026-091101", model: "WH-1000XM5", pickupDate: "2026.09.12", carrier: "CJ대한통운", status: "센터 입고 완료" },
];
export const PLANS = [
  { plan: "My Sony Care 3년", model: "ILCE-7RM6", until: "2029.03.01", status: "가입중" },
  { plan: "EPS 연장서비스", model: "-", until: "-", status: "가입 가능 제품 1대" },
];

export const ACADEMY = [
  { title: "[건축 사진] 도시의 선과 면을 담다 - 1강", img: encodeURI("/asset/sony/건물.png"), date: "2026.09.18", status: "결제완료" },
  { title: "[인물 사진] 자연광 포트레이트 - 2강", img: encodeURI("/asset/sony/인물.png"), date: "2026.09.25", status: "결제완료" },
  { title: "[풍경 사진] 골든아워 장노출 - 1강", img: encodeURI("/asset/sony/풍경.png"), date: "2026.10.02", status: "접수 대기" },
];
export const EVENTS = [
  { title: "α7R VI 런칭 체험단", date: "2026.09.05", status: "응모 완료" },
  { title: "정품등록 감사 이벤트 9월", date: "2026.09.10", status: "당첨" },
];


export const won = (n: number) => n.toLocaleString("ko-KR");
