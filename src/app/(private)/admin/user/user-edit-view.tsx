'use client'
import User from '@/app/service/user/user.model';

const UserEditView = () => {
  return (
    <div className='p-2 grid grid-cols-4 gap-2 mb-2'
    >
      <input className="border border-primary-500 rounded-md" placeholder="name"></input>
      <div className="truncate">some@mi.com</div>
      <div className="font-bold">Access Role</div>

    </div>

  )
}

export default UserEditView;
