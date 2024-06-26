import './Tag.scss'

const Tag = ({title,prefix,main_value,postfix}) =>{
    return(
        <div className="tag">
            <span className="tag__title">{title}</span>
            <div className="tag__body">
                <span className="tag__body-prefix">{prefix}&nbsp;</span>
                <span className="tag__body-main-value">{main_value}</span>
                <span className="tag__body-postfix">&nbsp;{postfix}</span>
            </div>
    </div>
    )
}

export default Tag