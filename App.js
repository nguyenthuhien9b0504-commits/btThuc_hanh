import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useAuth } from "./AuthContext";
import { ProductProvider, useProducts } from "./ProductContext";

const { width } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

const COLORS = {
  white: "#FFFFFF",
  bg: "#FFFFFF",
  primary: "#4C43F7",
  paleYellow: "#F2F1C8",
  lightGray: "#F7F7F7",
  text: "#111111",
  subText: "#7D7D7D",
  greenActive: "#34D8A4",
  border: "#ECECEC",
  yellow: "#FFD400",
};

const IMAGES = {
  tabHome: require("./Thuchanh/01.png"),
  tabIndex: require("./Thuchanh/03.png"),
  tabProfile: require("./Thuchanh/05.png"),
  tabOrder: require("./Thuchanh/Group33657.png"),

  bellIcon: require("./Thuchanh/Group18103.png"),
  backIcon: require("./Thuchanh/Frame(2).png"),
  deleteIcon: require("./Thuchanh/Frame(3).png"),

  catPizza: require("./Thuchanh/Group33652.png"),
  catBurger: require("./Thuchanh/Group33654.png"),
  catDrink: require("./Thuchanh/Group33653.png"),
  catRici: require("./Thuchanh/Group33655.png"),

  menuHome: require("./Thuchanh/Frame(1).png"),
  menuCard: require("./Thuchanh/Frame(3).png"),
  menuDark: require("./Thuchanh/tdesignmodedark.png"),
  menuTrack: require("./Thuchanh/Frame(4).png"),
  menuSettings: require("./Thuchanh/Frame(5).png"),
  menuHelp: require("./Thuchanh/Frame(6).png"),
  menuArrow: require("./Thuchanh/Frame(2).png"),

  locationBlock: require("./Thuchanh/Group33656.png"),
  confirmOrderBtn: require("./Thuchanh/Group33662.png"),
  qtyControl: require("./Thuchanh/Group33665.png"),
  ratingBlock: require("./Thuchanh/Group33666.png"),
  checkoutSummary: require("./Thuchanh/Group33667.png"),
  callSquare: require("./Thuchanh/sql.png"),
  addressCard: require("./Thuchanh/Group33669.png"),
  thumbsRow: require("./Thuchanh/Group33670.png"),
  paymentMethod: require("./Thuchanh/payment.png"),
  avatar: require("./Thuchanh/Group33672.png"),

  profileTopBg: require("./Thuchanh/Rectangle.png"),
  burgerHero: require("./Thuchanh/Rectangle 35.png"),

  // THÊM ẢNH BANNER HOME
  homeBannerBurger: require("./Thuchanh/Rectangle 35.png"),

  logoutBtn: require("./Thuchanh/Button.png"),
  editIcon: require("./Thuchanh/tableredit.png"),
  darkToggle: require("./Thuchanh/Toggle.png"),
};

// ================== TAB ICON ==================
function TabIcon({ source, label, focused }) {
  return (
    <View style={styles.tabIconWrap}>
      <Image source={source} style={styles.tabIcon} resizeMode="contain" />
      <Text style={[styles.tabLabel, { color: focused ? COLORS.primary : "#111" }]}>
        {label}
      </Text>
    </View>
  );
}

// ================== LOGIN SCREEN ==================
function LoginScreen() {
  const { login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (isRegister) {
      const result = register(name, email, password);
      Alert.alert("Thông báo", result.message);
      if (result.success) {
        setIsRegister(false);
        setName("");
        setEmail("");
        setPassword("");
      }
    } else {
      const result = login(email, password);
      Alert.alert("Thông báo", result.message);
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <View style={styles.authBox}>
        <Text style={styles.authTitle}>{isRegister ? "Đăng ký" : "Đăng nhập"}</Text>

        {isRegister && (
          <TextInput
            placeholder="Nhập họ tên"
            style={styles.authInput}
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          placeholder="Nhập email"
          style={styles.authInput}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Nhập mật khẩu"
          style={styles.authInput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.authBtn} onPress={handleSubmit}>
          <Text style={styles.authBtnText}>{isRegister ? "Đăng ký" : "Đăng nhập"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
          <Text style={styles.switchAuthText}>
            {isRegister
              ? "Đã có tài khoản? Đăng nhập"
              : "Chưa có tài khoản? Đăng ký"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ================== SEARCH BAR ==================
function SearchBar() {
  const { searchProducts } = useProducts();

  return (
    <View style={styles.searchBar}>
      <Text style={styles.searchIcon}>⌕</Text>
      <TextInput
        placeholder="Search your food"
        placeholderTextColor="#D7D3FF"
        style={styles.searchInput}
        onChangeText={(text) => searchProducts(text)}
      />
      <Text style={styles.searchFilter}>⚙</Text>
    </View>
  );
}

// ================== CATEGORY CARD ==================
function CategoryCard({ active, icon, label, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.categoryCard, active && styles.categoryCardActive]}
      onPress={onPress}
    >
      <Image source={icon} style={styles.categoryIcon} resizeMode="contain" />
      <Text style={styles.categoryText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ================== PRODUCT ITEM ==================
function ProductItem({ item }) {
  return (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} resizeMode="cover" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productCategory}>{item.category}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productRating}>⭐ {item.rating}</Text>
    </View>
  );
}

// ================== HOME BANNER ==================
function HomeBurgerBanner() {
  return (
    <View style={styles.homeBanner}>
      <View style={styles.homeBannerLeft}>
        <Text style={styles.homeBannerTitle}>BURGER</Text>
        <Text style={styles.homeBannerSubtitle}>Today's Hot offer</Text>

        <View style={styles.homeBannerRatingRow}>
          <View style={styles.avatarStack}>
            <Image source={IMAGES.avatar} style={[styles.smallAvatar, { zIndex: 3 }]} />
            <Image source={IMAGES.avatar} style={[styles.smallAvatar, styles.avatarOverlap1, { zIndex: 2 }]} />
            <Image source={IMAGES.avatar} style={[styles.smallAvatar, styles.avatarOverlap2, { zIndex: 1 }]} />
          </View>

          <Text style={styles.homeBannerRating}>⭐ 4.9 (3k+ Rating)</Text>
        </View>
      </View>

      <Image
        source={IMAGES.homeBannerBurger}
        style={styles.homeBannerImage}
        resizeMode="cover"
      />

      <View style={styles.homeBannerBadge}>
        <Text style={styles.homeBannerBadgeText}>10%</Text>
        <Text style={styles.homeBannerBadgeText}>OFF</Text>
      </View>
    </View>
  );
}

// ================== HOME SCREEN ==================
function HomeScreen() {
  const {
    filteredProducts,
    filterByCategory,
    allProducts,
    setFilteredProducts,
  } = useProducts();

  const [activeCategory, setActiveCategory] = useState("");

  const handleCategory = (category) => {
    if (activeCategory === category) {
      setActiveCategory("");
      setFilteredProducts(allProducts);
    } else {
      setActiveCategory(category);
      filterByCategory(category);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.homeHeader}>
          <View style={styles.homeTopRow}>
            <Image source={IMAGES.avatar} style={styles.headerAvatar} resizeMode="cover" />

            <Image
              source={IMAGES.locationBlock}
              style={styles.locationBlockImg}
              resizeMode="contain"
            />

            <TouchableOpacity style={styles.bellCircle}>
              <Image source={IMAGES.bellIcon} style={styles.bellIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.homeBody}>
          <SearchBar />

          <View style={styles.categoryRow}>
            <CategoryCard
              active={activeCategory === "PIZZA"}
              icon={IMAGES.catPizza}
              label="PIZZA"
              onPress={() => handleCategory("PIZZA")}
            />
            <CategoryCard
              active={activeCategory === "BURGER"}
              icon={IMAGES.catBurger}
              label="BURGER"
              onPress={() => handleCategory("BURGER")}
            />
            <CategoryCard
              active={activeCategory === "DRINK"}
              icon={IMAGES.catDrink}
              label="DRINK"
              onPress={() => handleCategory("DRINK")}
            />
            <CategoryCard
              active={activeCategory === "RICI"}
              icon={IMAGES.catRici}
              label="RICI"
              onPress={() => handleCategory("RICI")}
            />
          </View>

          {/* BANNER BURGER */}
          <HomeBurgerBanner />

          {/* dots */}
          <View style={styles.bannerDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductItem item={item} />}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================== CART SCREEN ==================
function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 18 }}
      >
        <View style={styles.cartHeader}>
          <TouchableOpacity>
            <Image source={IMAGES.backIcon} style={styles.headerSmallIcon} resizeMode="contain" />
          </TouchableOpacity>

          <Text style={styles.cartHeaderTitle}>Shopping Cart</Text>

          <TouchableOpacity>
            <Image source={IMAGES.deleteIcon} style={styles.headerSmallIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.cartHeroCard}>
          <View style={styles.offerBadgeCart}>
            <Text style={styles.offerBadgeText}>10%</Text>
            <Text style={styles.offerBadgeText}>OFF</Text>
          </View>

          <Image source={IMAGES.burgerHero} style={styles.cartHeroImage} resizeMode="cover" />

          <Image source={IMAGES.thumbsRow} style={styles.thumbsRowImg} resizeMode="stretch" />
        </View>

        <View style={styles.cartContent}>
          <View style={styles.titlePriceRow}>
            <Text style={styles.cartFoodTitle}>BURGER</Text>
            <Text style={styles.cartPriceText}>$28</Text>
          </View>

          <View style={styles.ratingQtyRow}>
            <Image source={IMAGES.ratingBlock} style={styles.ratingBlockImg} resizeMode="contain" />

            <View style={styles.qtyWrap}>
              <TouchableOpacity style={styles.qtyBtn}>
                <Text style={styles.qtyBtnText}>＋</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>02</Text>

              <TouchableOpacity style={styles.qtyBtn}>
                <Text style={styles.qtyBtnText}>－</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.addressRow}>
            <Image source={IMAGES.addressCard} style={styles.addressCardImg} resizeMode="stretch" />
            <Image source={IMAGES.callSquare} style={styles.callSquareImg} resizeMode="contain" />
          </View>

          <Image source={IMAGES.paymentMethod} style={styles.paymentImg} resizeMode="stretch" />
          <Image source={IMAGES.checkoutSummary} style={styles.summaryImg} resizeMode="stretch" />
          <Image
            source={IMAGES.confirmOrderBtn}
            style={styles.confirmOrderImg}
            resizeMode="stretch"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================== INDEX SCREEN ==================
function IndexScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.indexWrap}>
        <Text style={styles.indexText}>INDEX Screen</Text>
      </View>
    </SafeAreaView>
  );
}

// ================== PROFILE ROW ==================
function ProfileRow({ icon, title, isDarkMode }) {
  return (
    <View style={styles.profileRow}>
      <View style={styles.profileRowLeft}>
        <Image source={icon} style={styles.profileMenuIcon} resizeMode="contain" />
        <Text style={styles.profileRowText}>{title}</Text>
      </View>

      {isDarkMode ? (
        <Image source={IMAGES.darkToggle} style={styles.darkToggleImg} resizeMode="contain" />
      ) : (
        <Image source={IMAGES.menuArrow} style={styles.arrowImg} resizeMode="contain" />
      )}
    </View>
  );
}

// ================== PROFILE SCREEN ==================
function ProfileScreen() {
  const { currentUser, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 18 }}
      >
        <View style={styles.profileHeader}>
          <TouchableOpacity>
            <Image source={IMAGES.backIcon} style={styles.headerSmallIcon} resizeMode="contain" />
          </TouchableOpacity>

          <Text style={styles.profileHeaderTitle}>Profile</Text>
          <View style={{ width: 18 }} />
        </View>

        <Image source={IMAGES.profileTopBg} style={styles.profileTopBgImg} resizeMode="stretch" />

        <View style={styles.profileAvatarWrap}>
          <Image source={IMAGES.avatar} style={styles.profileAvatar} resizeMode="contain" />

          <TouchableOpacity style={styles.editCircle}>
            <Image source={IMAGES.editIcon} style={styles.editIconImg} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{currentUser?.name || "Guest"}</Text>
          <Text style={styles.profileEmail}>{currentUser?.email || "guest@gmail.com"}</Text>
        </View>

        <View style={styles.profileMenuList}>
          <ProfileRow icon={IMAGES.menuHome} title="Home" />
          <ProfileRow icon={IMAGES.menuCard} title="My Card" />
          <ProfileRow icon={IMAGES.menuDark} title="Dark Mood" isDarkMode />
          <ProfileRow icon={IMAGES.menuTrack} title="Track Your Order" />
          <ProfileRow icon={IMAGES.menuSettings} title="Settings" />
          <ProfileRow icon={IMAGES.menuHelp} title="Help Center" />
        </View>

        <View style={styles.logoutWrap}>
          <TouchableOpacity style={styles.realLogoutBtn} onPress={logout}>
            <Text style={styles.realLogoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================== MAIN TAB ==================
function MainApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon source={IMAGES.tabHome} label="HOME" focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Order"
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon source={IMAGES.tabOrder} label="ORDER" focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Index"
          component={IndexScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon source={IMAGES.tabIndex} label="INDEX" focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon source={IMAGES.tabProfile} label="PROFILE" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ================== ROOT ==================
function RootApp() {
  const { currentUser } = useAuth();
  return currentUser ? <MainApp /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <RootApp />
      </ProductProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 20,
  },

  authBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },

  authTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 20,
  },

  authInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
  },

  authBtn: {
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  authBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  switchAuthText: {
    marginTop: 16,
    textAlign: "center",
    color: COLORS.primary,
    fontWeight: "600",
  },

  tabBar: {
    height: 72,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    elevation: 0,
    paddingTop: 8,
    paddingBottom: 8,
  },

  tabIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
  },

  tabIcon: {
    width: 22,
    height: 22,
    marginBottom: 2,
  },

  tabLabel: {
    fontSize: 8,
    fontWeight: "700",
    lineHeight: 10,
  },

  homeHeader: {
    backgroundColor: COLORS.paleYellow,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 24,
  },

  homeTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },

  locationBlockImg: {
    flex: 1,
    height: 46,
    marginHorizontal: 10,
  },

  bellCircle: {
    width: 44,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  bellIcon: {
    width: 42,
    height: 42,
  },

  homeBody: {
    paddingHorizontal: 14,
  },

  searchBar: {
    height: 54,
    marginTop: -18,
    borderRadius: 27,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 18,
  },

  searchIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 0,
  },

  searchFilter: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  categoryCard: {
    width: (width - 28 - 18) / 4,
    height: 92,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryCardActive: {
    backgroundColor: COLORS.greenActive,
  },

  categoryIcon: {
    width: 28,
    height: 28,
    marginBottom: 8,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111",
  },

  // ================= HOME BANNER =================
  homeBanner: {
    width: "100%",
    height: 140,
    borderRadius: 16,
    backgroundColor: "#141A22",
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 12,
    position: "relative",
  },

  homeBannerLeft: {
    flex: 1,
    paddingLeft: 18,
    paddingTop: 20,
    zIndex: 2,
  },

  homeBannerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFD400",
    marginBottom: 4,
  },

  homeBannerSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 10,
  },

  homeBannerRatingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },

  smallAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#FFF",
  },

  avatarOverlap1: {
    marginLeft: -6,
  },

  avatarOverlap2: {
    marginLeft: -6,
  },

  homeBannerRating: {
    fontSize: 11,
    color: "#FFFFFF",
  },

  homeBannerImage: {
    width: 150,
    height: "100%",
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  homeBannerBadge: {
    position: "absolute",
    top: 18,
    right: 110,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },

  homeBannerBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 14,
    textAlign: "center",
  },

  bannerDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 4,
  },

  dotActive: {
    backgroundColor: "#222222",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  viewAll: {
    fontSize: 13,
    color: "#707070",
    fontWeight: "600",
  },

  productCard: {
    width: (width - 42) / 2,
    backgroundColor: "#F8F8F8",
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
  },

  productImage: {
    width: "100%",
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
  },

  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },

  productCategory: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  productPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: 6,
  },

  productRating: {
    fontSize: 12,
    marginTop: 4,
  },

  // ================= CART =================
  cartHeader: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  cartHeaderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  cartHeroCard: {
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#F8F8F8",
    position: "relative",
  },

  offerBadgeCart: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 10,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#4C43F7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  offerBadgeText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },

  cartHeroImage: {
    width: "100%",
    height: 188,
  },

  thumbsRowImg: {
    width: "100%",
    height: 70,
    backgroundColor: "#FFFFFF",
  },

  cartContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  titlePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cartFoodTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111",
    lineHeight: 28,
  },

  cartPriceText: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.primary,
  },

  ratingQtyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  ratingBlockImg: {
    width: 112,
    height: 20,
  },

  qtyWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#666",
  },

  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  addressCardImg: {
    width: width - 16 - 16 - 60 - 10,
    height: 68,
  },

  callSquareImg: {
    width: 54,
    height: 70,
  },

  paymentImg: {
    width: "100%",
    height: 60,
    marginTop: 10,
  },

  summaryImg: {
    width: "100%",
    height: 130,
    marginTop: 10,
  },

  confirmOrderImg: {
    width: "100%",
    height: 56,
    marginTop: 16,
  },

  indexWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  indexText: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
  },

  profileHeader: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  profileHeaderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  headerSmallIcon: {
    width: 18,
    height: 18,
  },

  profileTopBgImg: {
    width: "100%",
    height: 118,
  },

  profileAvatarWrap: {
    alignSelf: "center",
    marginTop: -48,
    position: "relative",
  },

  profileAvatar: {
    width: 118,
    height: 118,
  },

  editCircle: {
    position: "absolute",
    right: 10,
    bottom: 14,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  editIconImg: {
    width: 12,
    height: 12,
  },

  profileInfo: {
    alignItems: "center",
    marginTop: 8,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },

  profileEmail: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },

  profileMenuList: {
    marginTop: 16,
    paddingHorizontal: 16,
  },

  profileRow: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileMenuIcon: {
    width: 18,
    height: 18,
    marginRight: 14,
  },

  profileRowText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },

  arrowImg: {
    width: 12,
    height: 12,
    transform: [{ rotate: "180deg" }],
    opacity: 0.7,
  },

  darkToggleImg: {
    width: 48,
    height: 28,
  },

  logoutWrap: {
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 12,
  },

  realLogoutBtn: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#4C43F7",
    alignItems: "center",
    justifyContent: "center",
  },

  realLogoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});