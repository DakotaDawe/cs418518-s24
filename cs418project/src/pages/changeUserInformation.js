import ChangePassword from "@/components/changePassword";
import ChangeName from "@/components/changeName";

export default function ChangeUserInformation({ }) {
    return (
        <div>
            <ChangeName />
            <ChangePassword />
        </div>
    );
}