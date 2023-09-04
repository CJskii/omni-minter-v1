import ReferralLink from "./ReferralLink";

const InviteUsersCollapse = (props: { inviteLink: string }) => {
  const { inviteLink } = props;
  return (
    <div
      tabIndex={0}
      className="collapse collapse-plus border border-base-300 bg-base-200 w-full"
    >
      <div className="collapse-title text-xl font-medium">Invite friends</div>

      <div className="collapse-content flex flex-col items-center space-y-4 text-base-content">
        <div className="text-center flex flex-col justify-center items-center">
          Invite your friends to Mintly and earn points when they mint their
          first NFT! The more friends you invite, the more points you earn:
          <div className="pl-5 mt-2 flex flex-col justify-center items-start">
            <span>• 1-5 invites: 100 XP</span>
            <span>• 5-10 invites: 150 XP</span>
            <span>• 11+ invites: 250 XP</span>
          </div>
        </div>
        <ReferralLink inviteLink={inviteLink ? inviteLink : ""} />
      </div>
    </div>
  );
};

export default InviteUsersCollapse;
