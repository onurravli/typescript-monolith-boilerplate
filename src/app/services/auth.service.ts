import type { CreateUserDto, LoginUserDto } from "@/dtos";
import { CustomError } from "@/types";
import { bcrypt, env, jwt, prisma } from "@/utils";

class AuthService {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.me = this.me.bind(this);
  }
  public async register(data: CreateUserDto) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });
    if (existingUser) {
      throw new CustomError(409, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return user;
  }
  public async login(data: LoginUserDto) {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new CustomError(401, "Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new CustomError(401, "Invalid credentials");
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        type: "access",
      },
      env.JWT_SECRET!,
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
        type: "refresh",
      },
      env.JWT_SECRET!,
    );
    const secureUser = {
      ...user,
      password: undefined,
    };
    return {
      user: secureUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
  public async me(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new CustomError(401, "Invalid credentials");
    }
    return user;
  }
}

export default AuthService;
